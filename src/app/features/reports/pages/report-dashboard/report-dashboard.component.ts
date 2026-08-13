import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../core/services/report.service';
import { PendingTaskReport } from '../../../../core/models/report.model';
import { finalize } from 'rxjs/operators';
import { PaginatedResult } from '../../../../core/models/paginated-result.model';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {
  reportData: PendingTaskReport[] = [];
  isLoading = false;

  pageNumber = 1;
  pageSize = 10;
  totalPages = 1;
  hasNextPage = false;
  hasPreviousPage = false;
  searchTerm = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.reportService.getPendingTasksReport(this.pageNumber, this.pageSize, this.searchTerm)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => {
        this.reportData = data.items;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPreviousPage = data.hasPreviousPage;
      });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.pageNumber = 1;
    this.loadReport();
  }

  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.loadReport();
  }
}
