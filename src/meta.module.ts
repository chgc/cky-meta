import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaConfig } from './meta-config.model';
import { MetaService } from './meta.service';
import { META_CONFIG } from './meta.config';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: []
})
export class MetaModule {
  static forRoot(metaConfig: MetaConfig = { useTitleSuffix: false, defaults: {} }): ModuleWithProviders {
    return {
      ngModule: MetaModule,
      providers: [
        { provide: META_CONFIG, useValue: metaConfig },
        MetaService
      ]
    };
  }
}

