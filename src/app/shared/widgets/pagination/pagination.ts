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
    const total = this.totalPage();
    const cPage = this.page();
    const limit = 5;

    let sPage = cPage - 2;
    let ePage = cPage + 2;

    if (sPage < 1) { sPage = 1; ePage = Math.min(total, sPage + limit - 1); }
    if (ePage > total) { sPage = Math.max(1, ePage - limit + 1); ePage = total; }

    const pageArray = [];

    for (let x = sPage; x <= ePage; x++) { pageArray.push(x); }

    return pageArray;
  });
  //#endregion

  //#region Method
  public flip(page: number) {
    if (page >= 1 && page <= this.totalPage() && page !== this.page()) { this.pageX.emit(page); }
  }
  //#endregion
}
