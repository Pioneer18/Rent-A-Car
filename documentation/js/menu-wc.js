'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rent-a-car documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link">AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppConfigModule-312e9350f36ad23d03dfce1aa1012c43"' : 'data-target="#xs-injectables-links-module-AppConfigModule-312e9350f36ad23d03dfce1aa1012c43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-312e9350f36ad23d03dfce1aa1012c43"' :
                                        'id="xs-injectables-links-module-AppConfigModule-312e9350f36ad23d03dfce1aa1012c43"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' : 'data-target="#xs-controllers-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' :
                                            'id="xs-controllers-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImagesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/RentalController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RentalController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UnavailabilityController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnavailabilityController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' : 'data-target="#xs-injectables-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' :
                                        'id="xs-injectables-links-module-AppModule-7b728a9c19b02854424e7027f26298ab"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' : 'data-target="#xs-controllers-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' :
                                            'id="xs-controllers-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' : 'data-target="#xs-injectables-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' :
                                        'id="xs-injectables-links-module-AuthModule-802c2389549fdd9211dc223419af4c06"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmailService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExtractKeyValueUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExtractKeyValueUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RedisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VerifyNewPasswordUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>VerifyNewPasswordUtil</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link">DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ImagesModule.html" data-type="entity-link">ImagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' : 'data-target="#xs-controllers-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' :
                                            'id="xs-controllers-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' }>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' : 'data-target="#xs-injectables-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' :
                                        'id="xs-injectables-links-module-ImagesModule-00acd504ae6b6f1cc64c4e3dd264266b"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateMulterUploadUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CreateMulterUploadUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteS3ImagesUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeleteS3ImagesUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImagesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ImagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MulterUploadUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MulterUploadUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProcessSaveDataUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProcessSaveDataUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RedisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3Provider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>S3Provider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link">RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RedisModule-6b15db4066bb068d17bcd3fe6f56fc1b"' : 'data-target="#xs-injectables-links-module-RedisModule-6b15db4066bb068d17bcd3fe6f56fc1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-6b15db4066bb068d17bcd3fe6f56fc1b"' :
                                        'id="xs-injectables-links-module-RedisModule-6b15db4066bb068d17bcd3fe6f56fc1b"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RentalModule.html" data-type="entity-link">RentalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' : 'data-target="#xs-controllers-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' :
                                            'id="xs-controllers-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' }>
                                            <li class="link">
                                                <a href="controllers/RentalController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RentalController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' : 'data-target="#xs-injectables-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' :
                                        'id="xs-injectables-links-module-RentalModule-3a49f1c6f3e84ec0bf863e17ee84df2c"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateRentalDurationEnumUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GenerateRentalDurationEnumUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GeoUrlApiPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GeoUrlApiPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GeoUrlApiUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GeoUrlApiUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapNewRentalPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapNewRentalPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PricingPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PricingPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RedisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RentalDurationPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RentalDurationPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RentalSearchFilterPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RentalSearchFilterPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RentalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RentalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RequestCoordinatesPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RequestCoordinatesPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateEditDetailsPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateEditDetailsPipe</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UnavailabilityModule.html" data-type="entity-link">UnavailabilityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' : 'data-target="#xs-controllers-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' :
                                            'id="xs-controllers-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' }>
                                            <li class="link">
                                                <a href="controllers/UnavailabilityController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnavailabilityController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' : 'data-target="#xs-injectables-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' :
                                        'id="xs-injectables-links-module-UnavailabilityModule-306b21ca9ea4049117983b6658833a40"' }>
                                        <li class="link">
                                            <a href="injectables/UnavailabilityService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UnavailabilityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' : 'data-target="#xs-controllers-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' :
                                            'id="xs-controllers-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' : 'data-target="#xs-injectables-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' :
                                        'id="xs-injectables-links-module-UserModule-e4cf376cdf07f45e33afcaf6ab1c43da"' }>
                                        <li class="link">
                                            <a href="injectables/ExtractKeyValueUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExtractKeyValueUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RedisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VerifyNewPasswordUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>VerifyNewPasswordUtil</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CalculateRangeDto.html" data-type="entity-link">CalculateRangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link">ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRentalDto.html" data-type="entity-link">CreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateObject.html" data-type="entity-link">DateObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditDetailsDto.html" data-type="entity-link">EditDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorFilter.html" data-type="entity-link">ErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordDto.html" data-type="entity-link">ForgotPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link">HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageDto.html" data-type="entity-link">ImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageUploadDto.html" data-type="entity-link">ImageUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocCreateRentalDto.html" data-type="entity-link">LocCreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LuxonUtil.html" data-type="entity-link">LuxonUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapRentalUtil.html" data-type="entity-link">MapRentalUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/PricingDto.html" data-type="entity-link">PricingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessRentalTimeDto.html" data-type="entity-link">ProcessRentalTimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RadiusToMeters.html" data-type="entity-link">RadiusToMeters</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawCoordinatesDto.html" data-type="entity-link">RawCoordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawCreateRentalDto.html" data-type="entity-link">RawCreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawSearchRentalDto.html" data-type="entity-link">RawSearchRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveUnavailabilityDto.html" data-type="entity-link">RemoveUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RentalIdParamsDto.html" data-type="entity-link">RentalIdParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RentalSearchFilter.html" data-type="entity-link">RentalSearchFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestCoordinatesDto.html" data-type="entity-link">RequestCoordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RescheduleUnavailabilityDto.html" data-type="entity-link">RescheduleUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link">ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchRentalDto.html" data-type="entity-link">SearchRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToItemsIndexes.html" data-type="entity-link">ToItemsIndexes</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeOfValue.html" data-type="entity-link">TypeOfValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnavailabilityDto.html" data-type="entity-link">UnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyNewPasswordInterface.html" data-type="entity-link">VerifyNewPasswordInterface</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptHashPipe.html" data-type="entity-link">BcryptHashPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteUserDto.html" data-type="entity-link">DeleteUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindUserByResetPwTokenDto.html" data-type="entity-link">FindUserByResetPwTokenDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindUserDto.html" data-type="entity-link">FindUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoiValidationPipe.html" data-type="entity-link">JoiValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link">LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginDto.html" data-type="entity-link">LoginDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PickupUnavailabilityValidationMiddleware.html" data-type="entity-link">PickupUnavailabilityValidationMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PositiveNumber.html" data-type="entity-link">PositiveNumber</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReschedulePickupUnavailabilityValidationMiddleware.html" data-type="entity-link">ReschedulePickupUnavailabilityValidationMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchedulingValidationPipe.html" data-type="entity-link">SchedulingValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestRentalService.html" data-type="entity-link">TestRentalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateEmailMiddleware.html" data-type="entity-link">ValidateEmailMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateEmailUtil.html" data-type="entity-link">ValidateEmailUtil</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoggedOutGuard.html" data-type="entity-link">LoggedOutGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiResponseData.html" data-type="entity-link">ApiResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangePasswordInterface.html" data-type="entity-link">ChangePasswordInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CheckPasswordTypoInterface.html" data-type="entity-link">CheckPasswordTypoInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatedUserInterface.html" data-type="entity-link">CreatedUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateInterface.html" data-type="entity-link">CreateInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateMailOptionsInterface.html" data-type="entity-link">CreateMailOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateRentalInterface.html" data-type="entity-link">CreateRentalInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateRentalReturn.html" data-type="entity-link">CreateRentalReturn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateUserInterface.html" data-type="entity-link">CreateUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteAllImagesInterface.html" data-type="entity-link">DeleteAllImagesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteImagesInterface.html" data-type="entity-link">DeleteImagesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteResponseInterface.html" data-type="entity-link">DeleteResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteS3ImageInterface.html" data-type="entity-link">DeleteS3ImageInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteUserInterface.html" data-type="entity-link">DeleteUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditDetailsInterface.html" data-type="entity-link">EditDetailsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditDetailsUpdater.html" data-type="entity-link">EditDetailsUpdater</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditPricingInterface.html" data-type="entity-link">EditPricingInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditPricingUpdater.html" data-type="entity-link">EditPricingUpdater</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractKeyValueUtilInterface.html" data-type="entity-link">ExtractKeyValueUtilInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileUploadAndSaveInterface.html" data-type="entity-link">FileUploadAndSaveInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindProfileImageInterface.html" data-type="entity-link">FindProfileImageInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindRentalImagesInterface.html" data-type="entity-link">FindRentalImagesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindUserByResetPwTokenInterface.html" data-type="entity-link">FindUserByResetPwTokenInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindUserInterface.html" data-type="entity-link">FindUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgotPasswordInterface.html" data-type="entity-link">ForgotPasswordInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenerateRentalDurationEnumInterface.html" data-type="entity-link">GenerateRentalDurationEnumInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCoordinatesInterface.html" data-type="entity-link">GetCoordinatesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Image.html" data-type="entity-link">Image</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageFileInterface.html" data-type="entity-link">ImageFileInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageModelInterface.html" data-type="entity-link">ImageModelInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayloadInterface.html" data-type="entity-link">JwtPayloadInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailOptionsInterface.html" data-type="entity-link">MailOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeRequestInterface.html" data-type="entity-link">MakeRequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MulterUploadUtilInterface.html" data-type="entity-link">MulterUploadUtilInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessedSaveDataInterface.html" data-type="entity-link">ProcessedSaveDataInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RentalIdDto.html" data-type="entity-link">RentalIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RentalInterface.html" data-type="entity-link">RentalInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RentalModelInterface.html" data-type="entity-link">RentalModelInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RentalQuery.html" data-type="entity-link">RentalQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordInterface.html" data-type="entity-link">ResetPasswordInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RetrievedImagesInterface.html" data-type="entity-link">RetrievedImagesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaveImagesInterface.html" data-type="entity-link">SaveImagesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchRentalInterface.html" data-type="entity-link">SearchRentalInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransporterInterface.html" data-type="entity-link">TransporterInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnavailabilityInterface.html" data-type="entity-link">UnavailabilityInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnavailabilityModelInterface.html" data-type="entity-link">UnavailabilityModelInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateResponseInterface.html" data-type="entity-link">UpdateResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateUserInterface.html" data-type="entity-link">UpdateUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link">UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserModelInterface.html" data-type="entity-link">UserModelInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidateEmailUtilInterface.html" data-type="entity-link">ValidateEmailUtilInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidateUserInterface.html" data-type="entity-link">ValidateUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidateUserReturn.html" data-type="entity-link">ValidateUserReturn</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});