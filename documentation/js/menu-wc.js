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
                                        'data-target="#injectables-links-module-AppConfigModule-8a2b3dbf1c498a699824fd2bff5dffa6"' : 'data-target="#xs-injectables-links-module-AppConfigModule-8a2b3dbf1c498a699824fd2bff5dffa6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-8a2b3dbf1c498a699824fd2bff5dffa6"' :
                                        'id="xs-injectables-links-module-AppConfigModule-8a2b3dbf1c498a699824fd2bff5dffa6"' }>
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
                                            'data-target="#controllers-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' : 'data-target="#xs-controllers-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' :
                                            'id="xs-controllers-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' }>
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
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' : 'data-target="#xs-injectables-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' :
                                        'id="xs-injectables-links-module-AppModule-6bf2adf73154e8010500b31752a8b28b"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' : 'data-target="#xs-controllers-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' :
                                            'id="xs-controllers-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' : 'data-target="#xs-injectables-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' :
                                        'id="xs-injectables-links-module-AuthModule-37562590efb7ff12d97bfeeccc2f6912"' }>
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
                                            'data-target="#controllers-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' : 'data-target="#xs-controllers-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' :
                                            'id="xs-controllers-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' }>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' : 'data-target="#xs-injectables-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' :
                                        'id="xs-injectables-links-module-ImagesModule-a72df162951ce639aadde57353d0b1b5"' }>
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
                                            <a href="injectables/S3Provider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>S3Provider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RentalModule.html" data-type="entity-link">RentalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' : 'data-target="#xs-controllers-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' :
                                            'id="xs-controllers-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' }>
                                            <li class="link">
                                                <a href="controllers/RentalController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RentalController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' : 'data-target="#xs-injectables-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' :
                                        'id="xs-injectables-links-module-RentalModule-97fb045c7b3a8f5b1ff6ef8c3e92939b"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUpdaterDtoPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CreateUpdaterDtoPipe</a>
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
                                            <a href="injectables/GivenNoticePipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GivenNoticePipe</a>
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
                                            <a href="injectables/ProcessUnavailabilityPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProcessUnavailabilityPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RentalDurationPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RentalDurationPipe</a>
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
                                            <a href="injectables/SortUnavailabilityPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SortUnavailabilityPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateEditDetailsPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateEditDetailsPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateRemoveUnavailabilityPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateRemoveUnavailabilityPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateUnavailabilityPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateUnavailabilityPipe</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' : 'data-target="#xs-controllers-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' :
                                            'id="xs-controllers-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' : 'data-target="#xs-injectables-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' :
                                        'id="xs-injectables-links-module-UserModule-2a8424a85963156198ee05472bcfd4ee"' }>
                                        <li class="link">
                                            <a href="injectables/ExtractKeyValueUtil.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExtractKeyValueUtil</a>
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
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ImagesController.html" data-type="entity-link">ImagesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RentalController.html" data-type="entity-link">RentalController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link">UserController</a>
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
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link">ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckPasswordTypoDto.html" data-type="entity-link">CheckPasswordTypoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQueryDto.html" data-type="entity-link">CreateQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRentalDto.html" data-type="entity-link">CreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditDetailsDto.html" data-type="entity-link">EditDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorFilter.html" data-type="entity-link">ErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExtractKeyValueUtilDto.html" data-type="entity-link">ExtractKeyValueUtilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordDto.html" data-type="entity-link">ForgotPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GivenNoticeSearchRentalDto.html" data-type="entity-link">GivenNoticeSearchRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link">HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageDto.html" data-type="entity-link">ImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageQueryResultsDto.html" data-type="entity-link">ImageQueryResultsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageUploadDto.html" data-type="entity-link">ImageUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtPayloadDto.html" data-type="entity-link">JwtPayloadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocCreateRentalDto.html" data-type="entity-link">LocCreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link">LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PricingDto.html" data-type="entity-link">PricingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessedSaveDataDto.html" data-type="entity-link">ProcessedSaveDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessedUnavailabilityDto.html" data-type="entity-link">ProcessedUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessedUnavailabilityQueryDto.html" data-type="entity-link">ProcessedUnavailabilityQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessRentalTimeDto.html" data-type="entity-link">ProcessRentalTimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawCoordinatesDto.html" data-type="entity-link">RawCoordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawCreateRentalDto.html" data-type="entity-link">RawCreateRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawScheduleUnavailabilityDto.html" data-type="entity-link">RawScheduleUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawSearchRentalDto.html" data-type="entity-link">RawSearchRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveUnavailabilityDto.html" data-type="entity-link">RemoveUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestCoordinatesDto.html" data-type="entity-link">RequestCoordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link">ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchRentalDto.html" data-type="entity-link">SearchRentalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeOfValue.html" data-type="entity-link">TypeOfValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnavailabilityDto.html" data-type="entity-link">UnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnavailabilityInterface.html" data-type="entity-link">UnavailabilityInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnavailabilityQueryDto.html" data-type="entity-link">UnavailabilityQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUnavailabilityDataDto.html" data-type="entity-link">UpdateUnavailabilityDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUnavailabilityDto.html" data-type="entity-link">UpdateUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPropertyDto.html" data-type="entity-link">UserPropertyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidatedUnavailabilityDto.html" data-type="entity-link">ValidatedUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateScheduleUnavailabilityDto.html" data-type="entity-link">ValidateScheduleUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateUpdateUnavailabilityDto.html" data-type="entity-link">ValidateUpdateUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyNewPasswordDto.html" data-type="entity-link">VerifyNewPasswordDto</a>
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
                                    <a href="injectables/AppConfigService.html" data-type="entity-link">AppConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BcryptHashPipe.html" data-type="entity-link">BcryptHashPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateMulterUploadUtil.html" data-type="entity-link">CreateMulterUploadUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUpdaterDtoPipe.html" data-type="entity-link">CreateUpdaterDtoPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteS3ImagesUtil.html" data-type="entity-link">DeleteS3ImagesUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteUserDto.html" data-type="entity-link">DeleteUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link">EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExtractKeyValueUtil.html" data-type="entity-link">ExtractKeyValueUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindUserDto.html" data-type="entity-link">FindUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateRentalDurationEnumUtil.html" data-type="entity-link">GenerateRentalDurationEnumUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeoUrlApiPipe.html" data-type="entity-link">GeoUrlApiPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeoUrlApiUtil.html" data-type="entity-link">GeoUrlApiUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GivenNoticePipe.html" data-type="entity-link">GivenNoticePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImagesService.html" data-type="entity-link">ImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoiValidationPipe.html" data-type="entity-link">JoiValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link">LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginDto.html" data-type="entity-link">LoginDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapNewRentalPipe.html" data-type="entity-link">MapNewRentalPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterUploadUtil.html" data-type="entity-link">MulterUploadUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PositiveNumber.html" data-type="entity-link">PositiveNumber</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PricingPipe.html" data-type="entity-link">PricingPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessSaveDataUtil.html" data-type="entity-link">ProcessSaveDataUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessUnavailabilityPipe.html" data-type="entity-link">ProcessUnavailabilityPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RentalDurationPipe.html" data-type="entity-link">RentalDurationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RentalService.html" data-type="entity-link">RentalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestCoordinatesPipe.html" data-type="entity-link">RequestCoordinatesPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResetPasswordTokenDto.html" data-type="entity-link">ResetPasswordTokenDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/S3Provider.html" data-type="entity-link">S3Provider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SortUnavailabilityPipe.html" data-type="entity-link">SortUnavailabilityPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestRentalService.html" data-type="entity-link">TestRentalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateEditDetailsPipe.html" data-type="entity-link">ValidateEditDetailsPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateEmailMiddleware.html" data-type="entity-link">ValidateEmailMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateEmailUtil.html" data-type="entity-link">ValidateEmailUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateRemoveUnavailabilityPipe.html" data-type="entity-link">ValidateRemoveUnavailabilityPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateUnavailabilityPipe.html" data-type="entity-link">ValidateUnavailabilityPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateUpdateUnavailabilityMiddleware.html" data-type="entity-link">ValidateUpdateUnavailabilityMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerifyNewPasswordUtil.html" data-type="entity-link">VerifyNewPasswordUtil</a>
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
                                <a href="guards/LoggedOutGaurd.html" data-type="entity-link">LoggedOutGaurd</a>
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
                                <a href="interfaces/ImageInterface.html" data-type="entity-link">ImageInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailOptionsInterface.html" data-type="entity-link">MailOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RentalInterface.html" data-type="entity-link">RentalInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortedUnavailabilityDto.html" data-type="entity-link">SortedUnavailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransporterInterface.html" data-type="entity-link">TransporterInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link">UserInterface</a>
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