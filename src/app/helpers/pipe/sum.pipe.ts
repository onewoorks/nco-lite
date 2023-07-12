import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sum"
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    let total = items.reduce((a, b) => a + b[attr], 0);
    let hours = Math.floor(total / 60);
    let minutes = total % 60;
    return `${hours}:${minutes.toString().padStart(2,"0")}`
  }
}

@NgModule({
  declarations: [SumPipe],
  exports: [SumPipe]
})
export class SumPipeModule {}
