/**
 * http://demos.telerik.com/kendo-ui/grid/frozen-columns
 */
import React, {Component, PropTypes} from 'react';

export default class index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            // TODO
        }
    }
    componentWillMount() {
    }

    componentDidMount() {
        var $wrap = document.getElementById('freeze-grid'),
            $freezeHeader = $wrap.getElementsByClassName('f-grid-header-locked')[0],
            $scrollableHeader = $wrap.getElementsByClassName('f-grid-header-wrap')[0],
            $freezeContent = $wrap.getElementsByClassName('f-grid-content-locked')[0],
            $scrollableContent = $wrap.getElementsByClassName('f-grid-content')[0];
        // 添加事件
        $scrollableHeader.addEventListener('scroll', function(evt){
            console.log(evt.target);
        });
        // not fire
        $freezeContent.addEventListener('scroll', function(evt){
            console.log(evt.target);
        });
        $scrollableContent.addEventListener('scroll', function(evt){
            console.log(evt.target);
            var scrollHeight = $scrollableContent.getElementsByTagName('table')[0].scrollHeight,
                scrollLeft = $scrollableContent.getElementsByTagName('table')[0].scrollLeft;
//            $scrollableContent.getElementsByTagName('table')[0].scrollTop = scrollHeight;
            $freezeContent.scrollTop = scrollHeight;
            $scrollableHeader.scrollLeft = scrollLeft;
        });


        var MOUSE_OVER = false;
        /*window.addEventListener('mousewheel', function(evt){
         console.log(evt);
         if(MOUSE_OVER){
         if(evt.preventDefault) { evt.preventDefault(); }
         evt.returnValue = false;
         return false;
         }
         }, false);*/

        $freezeContent.addEventListener('mouseenter', function(evt){
            MOUSE_OVER=true;
            console.log(evt);
        }, false);
        $freezeContent.addEventListener('mouseleave', function(evt){
            MOUSE_OVER=false;
            console.log(evt);
        }, false);
        $freezeContent.addEventListener('mousewheel', function(evt){
            console.log(evt);
            var delta = evt.wheelDelta;
            if(delta > 0){
                //go up

            }
            else{
                //go down
            }
            var scrollHeight = $freezeContent.getElementsByTagName('table')[0].scrollHeight;
            $scrollableContent.scrollTop = scrollHeight;
            $freezeContent.scrollTop = scrollHeight;
        }, false);
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div>
                <div id="freeze-grid" class="f-grid f-grid-lockedcolumns" style="height: 540px;">
                    <div class="f-grouping-header" data-role="droptarget">Drag a column header and drop it here to group by that column</div>
                    <!-- header -->
                    <div class="f-grid-header" style="padding-right: 15px;">
                        <div class="f-grid-header-locked" style="width: 450px;" data-role="resizable">
                            <table>
                                <colgroup>
                                    <col style="width:150px"/>
                                    <col style="width:300px"/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th scope="col" role="columnheader" data-field="OrderID" rowspan="1" data-title="Order ID" data-index="0" id="6b6f4499-9087-4d30-9251-ab418c596c51"
                                        class="k-header k-with-icon" data-role="columnsorter">
                                        <a class="k-header-column-menu" href="#" tabindex="-1">
                                            <span class="k-icon k-i-arrowhead-s">Column Settings</span>
                                        </a>
                                        <a class="k-link" href="#">Order ID</a>
                                    </th>
                                    <th scope="col" role="columnheader" data-field="ShipName" rowspan="1" data-title="Ship Name" data-index="1" id="21766856-cbf7-46ff-818d-1436c03a7bf7"
                                        class="k-header k-with-icon" data-role="columnsorter">
                                        <a class="k-header-column-menu" href="#" tabindex="-1">
                                            <span class="k-icon k-i-arrowhead-s">Column Settings</span>
                                        </a>
                                        <a class="k-link" href="#">Ship Name</a>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="f-grid-header-wrap f-auto-scrollable" data-role="resizable" style="width: 476px;">
                            <table role="grid" style="width: 1000px;">
                                <colgroup>
                                    <col style="width:300px"/>
                                    <col style="width:300px"/>
                                    <col style="width:400px"/>
                                </colgroup>
                                <thead role="rowgroup">
                                <tr role="row">
                                    <th scope="col" role="columnheader" data-field="ShipCountry" rowspan="1" data-title="Ship Country" data-index="2"
                                        id="12fc1223-b07c-48be-a834-2290f511e267" class="k-header k-with-icon" data-role="columnsorter">
                                        <a class="k-header-column-menu" href="#" tabindex="-1">
                                            <span class="k-icon k-i-arrowhead-s">Column Settings</span>
                                        </a>
                                        <a class="k-link" href="#">Ship Country</a>
                                    </th>
                                    <th scope="col" role="columnheader" data-field="ShipCity" rowspan="1" data-title="Ship City" data-index="3"
                                        id="1dc39b51-71d6-45be-bba8-bb341a7886a7" class="k-header k-with-icon" data-role="columnsorter">
                                        <a class="k-header-column-menu" href="#" tabindex="-1">
                                            <span class="k-icon k-i-arrowhead-s">Column Settings</span>
                                        </a>
                                        <a class="k-link" href="#">Ship City</a>
                                    </th>
                                    <th scope="col" role="columnheader" data-field="ShipAddress" rowspan="1" data-index="4" id="f5b2191c-8569-4422-9988-c87a8ecab857"
                                        class="k-header k-with-icon" data-role="columnsorter">
                                        <a class="k-header-column-menu" href="#" tabindex="-1">
                                            <span class="k-icon k-i-arrowhead-s">Column Settings</span>
                                        </a>
                                        <a class="k-link" href="#">ShipAddress</a>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <!-- content left -->
                    <div class="f-grid-content-locked" style="width: 450px; height: 387px;">
                        <table>
                            <colgroup>
                                <col style="width:150px"/>
                                <col style="width:300px"/>
                            </colgroup>
                            <tbody>
                            <tr data-uid="61cd9064-67e0-40e5-8b2d-1eb6d99f83e1" role="row">
                                <td role="gridcell">10248</td>
                                <td role="gridcell">Vins et alcools Chevalier</td>
                            </tr>
                            <tr class="k-alt" data-uid="60309e77-7e47-4e27-98ee-73ff02b583da" role="row">
                                <td role="gridcell">10249</td>
                                <td role="gridcell">Toms Spezialitäten</td>
                            </tr>
                            <tr data-uid="8d11d53c-54a1-468f-9570-5206d1132c9e" role="row">
                                <td role="gridcell">10250</td>
                                <td role="gridcell">Hanari Carnes</td>
                            </tr>
                            <tr class="k-alt" data-uid="b4f8c8de-fc59-44c0-b500-00a60639c405" role="row">
                                <td role="gridcell">10251</td>
                                <td role="gridcell">Victuailles en stock</td>
                            </tr>
                            <tr data-uid="59c5cbb3-c2db-4399-9352-992800b69680" role="row">
                                <td role="gridcell">10252</td>
                                <td role="gridcell">Suprêmes délices</td>
                            </tr>
                            <tr class="k-alt" data-uid="025f54c4-3abe-4051-a735-8f6a8ecf3022" role="row">
                                <td role="gridcell">10253</td>
                                <td role="gridcell">Hanari Carnes</td>
                            </tr>
                            <tr data-uid="8b5806b3-6e85-4971-85df-576e62eb7006" role="row">
                                <td role="gridcell">10254</td>
                                <td role="gridcell">Chop-suey Chinese</td>
                            </tr>
                            <tr class="k-alt" data-uid="28ce4ca3-0a42-4bdf-88bd-a527e1eaca00" role="row">
                                <td role="gridcell">10255</td>
                                <td role="gridcell">Richter Supermarkt</td>
                            </tr>
                            <tr data-uid="d9d8a937-1ec8-4402-990b-221afd436b90" role="row">
                                <td role="gridcell">10256</td>
                                <td role="gridcell">Wellington Importadora</td>
                            </tr>
                            <tr class="k-alt" data-uid="7992a4ff-1dcc-431a-a1e6-f0b194f3aa38" role="row">
                                <td role="gridcell">10257</td>
                                <td role="gridcell">HILARION-Abastos</td>
                            </tr>
                            <tr data-uid="f39c123b-85ef-4bca-a010-568ada1ed9c4" role="row">
                                <td role="gridcell">10258</td>
                                <td role="gridcell">Ernst Handel</td>
                            </tr>
                            <tr class="k-alt" data-uid="6a2c8ad7-ac2a-4457-833a-9dbc33ca179b" role="row">
                                <td role="gridcell">10259</td>
                                <td role="gridcell">Centro comercial Moctezuma</td>
                            </tr>
                            <tr data-uid="35dcbd0b-3014-494e-86c8-5a4b082a0617" role="row">
                                <td role="gridcell">10260</td>
                                <td role="gridcell">Ottilies Käseladen</td>
                            </tr>
                            <tr class="k-alt" data-uid="cb3a460f-69b0-4ed7-8e03-6f6782520f84" role="row">
                                <td role="gridcell">10261</td>
                                <td role="gridcell">Que Delícia</td>
                            </tr>
                            <tr data-uid="f9849f45-a708-471a-a204-bbc6429f5945" role="row">
                                <td role="gridcell">10262</td>
                                <td role="gridcell">Rattlesnake Canyon Grocery</td>
                            </tr>
                            <tr class="k-alt" data-uid="07aad7ec-3d86-4493-b156-cd42bd8be721" role="row">
                                <td role="gridcell">10263</td>
                                <td role="gridcell">Ernst Handel</td>
                            </tr>
                            <tr data-uid="67d4ff01-d247-4c53-a4be-e03d677c0df2" role="row">
                                <td role="gridcell">10264</td>
                                <td role="gridcell">Folk och fä HB</td>
                            </tr>
                            <tr class="k-alt" data-uid="3bc81007-fc9d-4dcc-9e72-904a9088a984" role="row">
                                <td role="gridcell">10265</td>
                                <td role="gridcell">Blondel père et fils</td>
                            </tr>
                            <tr data-uid="df83a60a-c9e9-46f9-bd52-fd54654e8543" role="row">
                                <td role="gridcell">10266</td>
                                <td role="gridcell">Wartian Herkku</td>
                            </tr>
                            <tr class="k-alt" data-uid="5829563d-a60d-432f-8a9b-22a1f70fef83" role="row">
                                <td role="gridcell">10267</td>
                                <td role="gridcell">Frankenversand</td>
                            </tr>
                            <tr data-uid="03e37804-52a9-4a45-a54d-0e0e339e5e60" role="row">
                                <td role="gridcell">10268</td>
                                <td role="gridcell">GROSELLA-Restaurante</td>
                            </tr>
                            <tr class="k-alt" data-uid="cc32b471-2c54-4906-8ef5-14b788db75f3" role="row">
                                <td role="gridcell">10269</td>
                                <td role="gridcell">White Clover Markets</td>
                            </tr>
                            <tr data-uid="e33c2d8e-248b-4245-b8cd-48944558112f" role="row">
                                <td role="gridcell">10270</td>
                                <td role="gridcell">Wartian Herkku</td>
                            </tr>
                            <tr class="k-alt" data-uid="003bcda3-0903-4a14-a991-e536f677454c" role="row">
                                <td role="gridcell">10271</td>
                                <td role="gridcell">Split Rail Beer &amp; Ale</td>
                            </tr>
                            <tr data-uid="b63ba541-339f-45d4-a574-5ed600b13ca3" role="row">
                                <td role="gridcell">10272</td>
                                <td role="gridcell">Rattlesnake Canyon Grocery</td>
                            </tr>
                            <tr class="k-alt" data-uid="c8b5c542-5e17-4849-83a0-d20cb98d73e2" role="row">
                                <td role="gridcell">10273</td>
                                <td role="gridcell">QUICK-Stop</td>
                            </tr>
                            <tr data-uid="5246e0d6-1626-421c-a1eb-05a7d9e40735" role="row">
                                <td role="gridcell">10274</td>
                                <td role="gridcell">Vins et alcools Chevalier</td>
                            </tr>
                            <tr class="k-alt" data-uid="e1aaed5d-ddb7-4e45-801e-df84de900d67" role="row">
                                <td role="gridcell">10275</td>
                                <td role="gridcell">Magazzini Alimentari Riuniti</td>
                            </tr>
                            <tr data-uid="77c1ce81-2df8-443c-a8d7-184c71ebdef2" role="row">
                                <td role="gridcell">10276</td>
                                <td role="gridcell">Tortuga Restaurante</td>
                            </tr>
                            <tr class="k-alt" data-uid="760ceb99-f89b-49bd-84c3-d1096e7b5cf5" role="row" style="height: 50px;">
                                <td role="gridcell">10277</td>
                                <td role="gridcell">Morgenstern Gesundkost</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- content right -->
                    <div class="f-grid-content f-auto-scrollable" style="width: 491px; height: 402px;">
                        <table role="grid" style="height: auto; width: 1000px;">
                            <colgroup>
                                <col style="width:300px"/>
                                <col style="width:300px"/>
                                <col style="width:400px"/>
                            </colgroup>
                            <tbody role="rowgroup">
                            <tr data-uid="61cd9064-67e0-40e5-8b2d-1eb6d99f83e1" role="row">
                                <td role="gridcell">France</td>
                                <td role="gridcell">Reims</td>
                                <td role="gridcell">59 rue de l'Abbaye</td>
                            </tr>
                            <tr class="k-alt" data-uid="60309e77-7e47-4e27-98ee-73ff02b583da" role="row">
                                <td role="gridcell">Germany</td>
                                <td role="gridcell">Münster</td>
                                <td role="gridcell">Luisenstr. 48</td>
                            </tr>
                            <tr data-uid="8d11d53c-54a1-468f-9570-5206d1132c9e" role="row">
                                <td role="gridcell">Brazil</td>
                                <td role="gridcell">Rio de Janeiro</td>
                                <td role="gridcell">Rua do Paço, 67</td>
                            </tr>
                            <tr class="k-alt" data-uid="b4f8c8de-fc59-44c0-b500-00a60639c405" role="row">
                                <td role="gridcell">France</td>
                                <td role="gridcell">Lyon</td>
                                <td role="gridcell">2, rue du Commerce</td>
                            </tr>
                            <tr data-uid="59c5cbb3-c2db-4399-9352-992800b69680" role="row">
                                <td role="gridcell">Belgium</td>
                                <td role="gridcell">Charleroi</td>
                                <td role="gridcell">Boulevard Tirou, 255</td>
                            </tr>
                            <tr class="k-alt" data-uid="025f54c4-3abe-4051-a735-8f6a8ecf3022" role="row">
                                <td role="gridcell">Brazil</td>
                                <td role="gridcell">Rio de Janeiro</td>
                                <td role="gridcell">Rua do Paço, 67</td>
                            </tr>
                            <tr data-uid="8b5806b3-6e85-4971-85df-576e62eb7006" role="row">
                                <td role="gridcell">Switzerland</td>
                                <td role="gridcell">Bern</td>
                                <td role="gridcell">Hauptstr. 31</td>
                            </tr>
                            <tr class="k-alt" data-uid="28ce4ca3-0a42-4bdf-88bd-a527e1eaca00" role="row">
                                <td role="gridcell">Switzerland</td>
                                <td role="gridcell">Genève</td>
                                <td role="gridcell">Starenweg 5</td>
                            </tr>
                            <tr data-uid="d9d8a937-1ec8-4402-990b-221afd436b90" role="row">
                                <td role="gridcell">Brazil</td>
                                <td role="gridcell">Resende</td>
                                <td role="gridcell">Rua do Mercado, 12</td>
                            </tr>
                            <tr class="k-alt" data-uid="7992a4ff-1dcc-431a-a1e6-f0b194f3aa38" role="row">
                                <td role="gridcell">Venezuela</td>
                                <td role="gridcell">San Cristóbal</td>
                                <td role="gridcell">Carrera 22 con Ave. Carlos Soublette #8-35</td>
                            </tr>
                            <tr data-uid="f39c123b-85ef-4bca-a010-568ada1ed9c4" role="row">
                                <td role="gridcell">Austria</td>
                                <td role="gridcell">Graz</td>
                                <td role="gridcell">Kirchgasse 6</td>
                            </tr>
                            <tr class="k-alt" data-uid="6a2c8ad7-ac2a-4457-833a-9dbc33ca179b" role="row">
                                <td role="gridcell">Mexico</td>
                                <td role="gridcell">México D.F.</td>
                                <td role="gridcell">Sierras de Granada 9993</td>
                            </tr>
                            <tr data-uid="35dcbd0b-3014-494e-86c8-5a4b082a0617" role="row">
                                <td role="gridcell">Germany</td>
                                <td role="gridcell">Köln</td>
                                <td role="gridcell">Mehrheimerstr. 369</td>
                            </tr>
                            <tr class="k-alt" data-uid="cb3a460f-69b0-4ed7-8e03-6f6782520f84" role="row">
                                <td role="gridcell">Brazil</td>
                                <td role="gridcell">Rio de Janeiro</td>
                                <td role="gridcell">Rua da Panificadora, 12</td>
                            </tr>
                            <tr data-uid="f9849f45-a708-471a-a204-bbc6429f5945" role="row">
                                <td role="gridcell">USA</td>
                                <td role="gridcell">Albuquerque</td>
                                <td role="gridcell">2817 Milton Dr.</td>
                            </tr>
                            <tr class="k-alt" data-uid="07aad7ec-3d86-4493-b156-cd42bd8be721" role="row">
                                <td role="gridcell">Austria</td>
                                <td role="gridcell">Graz</td>
                                <td role="gridcell">Kirchgasse 6</td>
                            </tr>
                            <tr data-uid="67d4ff01-d247-4c53-a4be-e03d677c0df2" role="row">
                                <td role="gridcell">Sweden</td>
                                <td role="gridcell">Bräcke</td>
                                <td role="gridcell">Åkergatan 24</td>
                            </tr>
                            <tr class="k-alt" data-uid="3bc81007-fc9d-4dcc-9e72-904a9088a984" role="row">
                                <td role="gridcell">France</td>
                                <td role="gridcell">Strasbourg</td>
                                <td role="gridcell">24, place Kléber</td>
                            </tr>
                            <tr data-uid="df83a60a-c9e9-46f9-bd52-fd54654e8543" role="row">
                                <td role="gridcell">Finland</td>
                                <td role="gridcell">Oulu</td>
                                <td role="gridcell">Torikatu 38</td>
                            </tr>
                            <tr class="k-alt" data-uid="5829563d-a60d-432f-8a9b-22a1f70fef83" role="row">
                                <td role="gridcell">Germany</td>
                                <td role="gridcell">München</td>
                                <td role="gridcell">Berliner Platz 43</td>
                            </tr>
                            <tr data-uid="03e37804-52a9-4a45-a54d-0e0e339e5e60" role="row">
                                <td role="gridcell">Venezuela</td>
                                <td role="gridcell">Caracas</td>
                                <td role="gridcell">5ª Ave. Los Palos Grandes</td>
                            </tr>
                            <tr class="k-alt" data-uid="cc32b471-2c54-4906-8ef5-14b788db75f3" role="row">
                                <td role="gridcell">USA</td>
                                <td role="gridcell">Seattle</td>
                                <td role="gridcell">1029 - 12th Ave. S.</td>
                            </tr>
                            <tr data-uid="e33c2d8e-248b-4245-b8cd-48944558112f" role="row">
                                <td role="gridcell">Finland</td>
                                <td role="gridcell">Oulu</td>
                                <td role="gridcell">Torikatu 38</td>
                            </tr>
                            <tr class="k-alt" data-uid="003bcda3-0903-4a14-a991-e536f677454c" role="row">
                                <td role="gridcell">USA</td>
                                <td role="gridcell">Lander</td>
                                <td role="gridcell">P.O. Box 555</td>
                            </tr>
                            <tr data-uid="b63ba541-339f-45d4-a574-5ed600b13ca3" role="row">
                                <td role="gridcell">USA</td>
                                <td role="gridcell">Albuquerque</td>
                                <td role="gridcell">2817 Milton Dr.</td>
                            </tr>
                            <tr class="k-alt" data-uid="c8b5c542-5e17-4849-83a0-d20cb98d73e2" role="row">
                                <td role="gridcell">Germany</td>
                                <td role="gridcell">Cunewalde</td>
                                <td role="gridcell">Taucherstraße 10</td>
                            </tr>
                            <tr data-uid="5246e0d6-1626-421c-a1eb-05a7d9e40735" role="row">
                                <td role="gridcell">France</td>
                                <td role="gridcell">Reims</td>
                                <td role="gridcell">59 rue de l'Abbaye</td>
                            </tr>
                            <tr class="k-alt" data-uid="e1aaed5d-ddb7-4e45-801e-df84de900d67" role="row">
                                <td role="gridcell">Italy</td>
                                <td role="gridcell">Bergamo</td>
                                <td role="gridcell">Via Ludovico il Moro 22</td>
                            </tr>
                            <tr data-uid="77c1ce81-2df8-443c-a8d7-184c71ebdef2" role="row">
                                <td role="gridcell">Mexico</td>
                                <td role="gridcell">México D.F.</td>
                                <td role="gridcell">Avda. Azteca 123</td>
                            </tr>
                            <tr class="k-alt" data-uid="760ceb99-f89b-49bd-84c3-d1096e7b5cf5" role="row" style="height: 50px;">
                                <td role="gridcell">Germany</td>
                                <td role="gridcell">Leipzig</td>
                                <td role="gridcell">Heerstr. 22</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}