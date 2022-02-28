import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: any[], column: string): any[] {
    console.log(column);
    let sortedList = list.sort((a ,b) => {
      console.log(a[column] );
      console.log(b[column] );
      if(a[column] > b[column]){
        console.log(1);
        return 1;
      }
      if(a[column] < b[column]){
        console.log(-1);
        return -1;
      }

      console.log(0);
      return 0;
    })
    console.log(sortedList);
    return sortedList;
  }

}
