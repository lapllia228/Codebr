import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, search: string): SafeHtml {
    if (!search || !text) {
      return text;
    }

    const keywords = search.split(/\s+/).filter(k => k.length > 0);
    let highlightedText = text;

    keywords.forEach(keyword => {
      const regex = new RegExp(`(${this.escapeRegex(keyword)})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="highlight">$1</mark>'
      );
    });

    return this.sanitizer.sanitize(1, highlightedText) || text;
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
