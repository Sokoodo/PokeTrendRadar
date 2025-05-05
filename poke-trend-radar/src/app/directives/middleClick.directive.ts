import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[middleClickRedirect]',
  standalone: true,
})
export class MiddleClickDirective {

  @Input('middleClickRedirect') middleClickRedirect: string;
  @Input() isExternalUrl: boolean;

  constructor() {
    this.middleClickRedirect = '';
    this.isExternalUrl = false;
  }

  // @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent): void {
  //   if (event.button === 1) {
  //     event.preventDefault();
  //     if (this.isExternalUrl) {
  //       if (this.middleClickRedirect != '') {
  //         const url = this.middleClickRedirect.startsWith('http')
  //           ? this.middleClickRedirect
  //           : `https://${this.middleClickRedirect}`;
  //         window.open(url, '_blank');
  //       }
  //     } else {
  //       if (this.middleClickRedirect != '') {
  //         const fullUrl = `/${this.middleClickRedirect}`;
  //         window.open(`${window.location.origin}${fullUrl}`, '_blank');
  //       }
  //     }
  //   }
  // }
}
