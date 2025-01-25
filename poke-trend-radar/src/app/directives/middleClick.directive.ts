import { Directive, HostListener, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[middleClickRedirect]',
  standalone: true,
})
export class MiddleClickDirective {

  @Input('middleClickRedirect') middleClickRedirect: string;
  @Input() isExternalUrl: boolean;

  private _route = inject(Router);

  constructor() {
    this.middleClickRedirect = '';
    this.isExternalUrl = false;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent): void {
    if (event.button === 1) {
      event.preventDefault();
      if (this.isExternalUrl) {
        if (this.middleClickRedirect != '') {
          const url = this.middleClickRedirect.startsWith('http')
            ? this.middleClickRedirect
            : `https://${this.middleClickRedirect}`;
          window.open(url, '_blank');
        }
      } else {
        if (this.middleClickRedirect != '') {
          const fullUrl = `/${this.middleClickRedirect}`;
          window.open(`${window.location.origin}${fullUrl}`, '_blank');
        }
      }
    }
  }
}
