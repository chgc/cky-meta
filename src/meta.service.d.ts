import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { MetaConfig } from './meta-config.model';
/**
 * Update HTML meta tags for title, description and others automatically
 * based on the route in your Angular2 app.
 */
export declare class MetaService {
    private router;
    private document;
    private metaConfig;
    private titleService;
    private activatedRoute;
    constructor(router: Router, document: any, metaConfig: MetaConfig, titleService: Title, activatedRoute: ActivatedRoute);
    private _findLastChild(activatedRoute);
    private _getOrCreateMetaTag(name);
    private _updateMetaTags(meta?);
    /**
     * Set document Title
     * @param title title text
     * @param titleSuffix title suffix text
     */
    setTitle(title?: string, titleSuffix?: string): MetaService;
    /**
     * Set document Tag
     * @param tag meta tag's name property
     * @param value meta tag's content property
     */
    setTag(tag: string, value: string): MetaService;
}
