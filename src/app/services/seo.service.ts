import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SEOService {

  constructor(private meta: Meta) {
  }

  initMetaTags() {
    this.meta.addTag({ name: 'og:title', content: 'Heroes Test' });
    this.meta.addTag({ name: 'og:description', content: 'Heroe Description' });
  }

//   updateMetaDescription(description: string) {
//       this.
//   }

//   updateMetaLogo(logoUrl: string) {

//   }
}