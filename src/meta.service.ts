import { Inject, Injectable, Optional } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { META_CONFIG } from './meta.config';
import { MetaConfig } from './meta-config.model';

const isDefined = (val: any) => typeof val !== 'undefined';

/**
 * Update HTML meta tags for title, description and others automatically
 * based on the route in your Angular2 app.
 */
@Injectable()
export class MetaService {
    constructor(private router: Router,
        @Inject(DOCUMENT) private document: any,
        @Inject(META_CONFIG) private metaConfig: MetaConfig,
        private titleService: Title,
        private activatedRoute: ActivatedRoute) {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this._findLastChild(this.activatedRoute))
            .subscribe((routeData: any) => {
                this._updateMetaTags(routeData.meta);
            });
    }

    private _findLastChild(activatedRoute: ActivatedRoute) {
        const snapshot = activatedRoute.snapshot;

        let child = snapshot.firstChild;
        while (child.firstChild !== null) {
            child = child.firstChild;
        }
        return child.data;
    }

    private _getOrCreateMetaTag(name: string) {
        let el: HTMLElement = this.document.querySelector(`meta[name='${name}']`)
        if (!el) {
            el = this.document.createElement('meta');
            el.setAttribute('name', name);
            this.document.head.appendChild(el);
        }
        return el;
    }

    private _updateMetaTags(meta: any = {}) {
        if (meta.disableUpdate) {
            return false;
        }

        this.setTitle(meta.title, meta.titleSuffix);

        Object.keys(meta).forEach(key => {
            if (key === 'title' || key === 'titleSuffix') {
                return;
            }
            this.setTag(key, meta[key]);
        });

        Object.keys(this.metaConfig.defaults).forEach(key => {
            if (key in meta || key === 'title' || key === 'titleSuffix') {
                return;
            }
            this.setTag(key, this.metaConfig.defaults[key]);
        });
    }

    /** 
     * Set document Title
     * @param title title text
     * @param titleSuffix title suffix text
     */
    setTitle(title?: string, titleSuffix?: string): MetaService {
        const titleElement = this._getOrCreateMetaTag('title');
        const ogTitleElement = this._getOrCreateMetaTag('og:title');
        let titleStr = isDefined(title) ? title : (this.metaConfig.defaults['title'] || '');
        
        if (this.metaConfig.useTitleSuffix) {
            titleStr += isDefined(titleSuffix) ? titleSuffix : (this.metaConfig.defaults['titleSuffix'] || '');
        }

        titleElement.setAttribute('content', titleStr);
        ogTitleElement.setAttribute('content', titleStr);
        this.titleService.setTitle(titleStr);

        return this;
    }

    /**
     * Set document Tag
     * @param tag meta tag's name property
     * @param value meta tag's content property
     */
    setTag(tag: string, value: string): MetaService {
        if (tag == 'title' || tag === 'titleSuffix') {
            throw new Error(`Attempt to set ${tag} through 'setTag': 'title' and 'titleSuffix' are reserved tag names. Please use 'MetaService.setTitle' instead`);
        }
        const tagElement = this._getOrCreateMetaTag(tag);
        let tagStr = isDefined(value) ? value : (this.metaConfig.defaults[tag] || '');
        
        tagElement.setAttribute('content', tagStr);
        if (tag === 'description') {
            let ogDescElement = this._getOrCreateMetaTag('og:description');
            ogDescElement.setAttribute('content', tagStr);
        }
        return this;
    }
}




