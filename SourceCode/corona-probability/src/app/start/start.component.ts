import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../core/services/corona.service';
import { CoronaData, KeyValue } from '../core/model/CoronaData';
import * as d3 from 'd3';
import { line } from 'd3';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  private svg;
  private width: number = 500;
  private height: number = 300;
  private margin: number = 35;

  public Model: CoronaData = new CoronaData();

  constructor(private coronaService: CoronaService) {
    this.Model.sevenDayInzidenz = 100;
    this.Model.foundProbability = 80;
  }

  ngOnInit(): void {
    this.OnInputChangeHandler();
  }

  public IsSevenDayInzidenzValid() {
    if (isNaN(this.Model.sevenDayInzidenz) || this.Model.sevenDayInzidenz < 0.1 || this.Model.sevenDayInzidenz > 100000) {
      return false;
    }
    return true;
  }

  public IsFoundProbabilityValid() {
    if (isNaN(this.Model.foundProbability) || this.Model.foundProbability < 0.1 || this.Model.foundProbability > 100) {
      return false;
    }
    return true;
  }

  public OnInputChangeHandler() {
    if (!this.IsSevenDayInzidenzValid() || !this.IsFoundProbabilityValid()) {
      this.Model.isValid = false;
      return;
    }

    this.coronaService.Calculate(this.Model, 1, 100);

    this.drawData();
  };

  private drawData() {
    d3.select('svg').remove();

    this.svg = d3.select('.chart-probabilities')
      .append('svg')
      .attr('height', this.height + this.margin * 2)
      .attr('width', this.width + this.margin * 2)
      .attr('viewBox', '0 0 ' + (this.width + this.margin * 2) + ' ' + (this.height + this.margin * 2))
      .attr('preserveAspectRatio', 'xMinYMid meet')
      .attr('x', '0')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ', ' + this.margin + ')');

    var slices = [{
      id: 'Probability One Positive',
      values: this.Model.atLeastOnePositive.map((d: KeyValue) => { return { count: d.count, probability: d.probability * 100 } })
    }];

    // Scales
    const xScale = d3.scaleLinear().range([0, this.width]);
    const yScale = d3.scaleLinear().rangeRound([this.height, 0]);
    xScale.domain(d3.extent(this.Model.atLeastOnePositive, function (d: KeyValue) { return d.count; }));
    yScale.domain([(0), d3.max(slices, function (c) { return d3.max(c.values, (d: KeyValue) => { return d.probability; }); })]);

    // Axis
    const yaxis = d3.axisLeft(yScale).ticks(slices[0].values.length / 10);
    const xaxis = d3.axisBottom(xScale).ticks(slices[0].values.length / 5);

    // Lines
    const line = d3
      .line()
      .x(function (d: any) { return xScale(d.count); })
      .y(function (d: any) { return yScale(d.probability); });

    // Output - axis
    this.svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xaxis)
      .append("text")
      .attr("dy", "-.75em")
      .attr("x", 500)
      .style("text-anchor", "end")
      .text("Anzahl Personen");

    this.svg
      .append("g")
      .attr("class", "axis")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".75em")
      .attr("y", 6)
      .style("text-anchor", "end")
      .text("Wahrscheinlichkeit (%) für infektiöse Person");

    // Output - line
    const lines = this.svg.selectAll("lines")
      .data(slices)
      .enter()
      .append("g");

    lines.append("path")
      .attr("class", 'line')
      .attr("d", function (d) { return line(d.values); });
  };
}
