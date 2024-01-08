import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDescription]',
})
export class DescriptionDirective implements OnInit {
  @Input() appDescription = '';
  MAX_DESCRIPTION_LENGTH = 200;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.innerText = this.getDescriptionSummary();
  }

  getDescriptionSummary() {
    if (this.appDescription.length < this.MAX_DESCRIPTION_LENGTH) {
      return this.appDescription;
    }

    return (
      this.appDescription.substring(0, this.MAX_DESCRIPTION_LENGTH) + '...'
    );
  }
}
