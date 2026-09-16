import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  //#region State
  public totalCount = input.required<number>();
  public page = input.required<number>();
  public size = input.required<number>();

  public pageX = output<number>();
  //#endregion

  //#region Computed
  public totalPage = computed(() => Math.ceil(this.totalCount() / this.size()) || 1);
  public pageArray = computed(() => {
    const pageArray = [];

    for (let x = 1; x <= this.totalPage(); x++) { pageArray.push(x); }

    return pageArray;
  });
  //#endregion

  //#region Method
  public flip(page: number) {
    if (page >= 1 && page <= this.totalPage() && page !== this.page()) { this.pageX.emit(page); }
  }
  //#endregion
}
