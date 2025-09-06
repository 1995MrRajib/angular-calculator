import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator-app';
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  operators = ['+', '-', '*', '/'];

  expressionArray = signal<string[]>([]);
  result = signal<number | string>(0);

  addToExpression(value: string) {
    this.expressionArray.update(arr => [...arr, value]);
  }

  calculateExpression() {
    try {
      const expression = this.expressionArray().join('');
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
      const evalResult = new Function('return ' + sanitizedExpression)();
      this.result.set(evalResult);
    } catch (error) {
      this.result.set('Invalid expression');
    }
  }

  clearExpression() {
    this.expressionArray.set([]);
    this.result.set(0);
  }
}
