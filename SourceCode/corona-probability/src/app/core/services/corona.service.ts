import { Injectable, NgModule } from '@angular/core';
import { CoronaData, KeyValue } from '../model/CoronaData';

@Injectable({
    providedIn: 'root'
})
export class CoronaService {

    public Calculate(_data: CoronaData, _rangeFrom: number, _rangeTo: number) {
        _data.sevenDayUnfoundInzidenz = _data.sevenDayInzidenz * (1 - _data.foundProbability / 100) / (_data.foundProbability / 100);
        _data.probabilityForUnfoundPositive = 2 * _data.sevenDayUnfoundInzidenz / 100000;

        _data.atLeastOnePositive = [];
        for (var i = _rangeFrom; i < _rangeTo; i++) {

            var item = new KeyValue();
            item.count = i;
            item.probability = this.atLeastOnePositive(i, _data.probabilityForUnfoundPositive);
            _data.atLeastOnePositive.push(item);
        }
        
        _data.atLeastOnePositiveOutOf10 = this.atLeastOnePositive(10, _data.probabilityForUnfoundPositive);
        _data.atLeastOnePositiveOutOf50 = this.atLeastOnePositive(50, _data.probabilityForUnfoundPositive);
    };

    /**
     * Returns the probability that at least one person out of the provided number of people is positive assuming
     * the given probability to be positive per person. The given probabilty is expected ratio (not as percent), e.g.,
     * if 1 out of 100 is positive (aka 1%), the expected argument is 0.01.
     * @param _numberOfPeople 
     * @param _positiveProbability 
     */
    private atLeastOnePositive(_numberOfPeople: number, _positiveProbability: number) {
        let negativeProbability = 1 - _positiveProbability;
        let allNegative = Math.pow(negativeProbability, _numberOfPeople);
        return 1 - allNegative;
    }
}