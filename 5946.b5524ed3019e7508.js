"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5946],{5946:(U,h,c)=>{c.r(h),c.d(h,{PantryPageModule:()=>B});var p=c(177),d=c(4341),a=c(7863),m=c(70),u=c(467),t=c(4438),g=c(3624),y=c(7376);function P(i,s){if(1&i&&(t.j41(0,"ion-item"),t.EFF(1),t.k0s()),2&i){const o=s.$implicit;t.R7$(),t.JRh(o.name)}}let f=(()=>{var i;class s{constructor(e){this.mc=e}ngOnInit(){}close(){return this.mc.dismiss(!1,"cancel")}confirm(){return this.mc.dismiss(!0,"confirm")}}return(i=s).\u0275fac=function(e){return new(e||i)(t.rXU(a.W3))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-expiration-notification"]],inputs:{expiringItems:"expiringItems"},standalone:!0,features:[t.aNF],decls:17,vars:1,consts:[[4,"ngFor","ngForOf"],["slot","start",3,"click"],["slot","end",3,"click"]],template:function(e,n){1&e&&(t.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),t.EFF(3,"Expired Items"),t.k0s()()(),t.j41(4,"ion-content")(5,"p"),t.EFF(6,"The following items have expired: "),t.k0s(),t.j41(7,"ion-list"),t.DNE(8,P,2,1,"ion-item",0),t.k0s(),t.j41(9,"p"),t.EFF(10,"Remove from pantry list?"),t.k0s()(),t.j41(11,"ion-footer")(12,"ion-toolbar")(13,"ion-button",1),t.bIt("click",function(){return n.close()}),t.EFF(14,"Close"),t.k0s(),t.j41(15,"ion-button",2),t.bIt("click",function(){return n.confirm()}),t.EFF(16,"Remove Items"),t.k0s()()()),2&e&&(t.R7$(8),t.Y8G("ngForOf",n.expiringItems))},dependencies:[a.bv,a.Jm,a.W9,a.M0,a.eU,a.uz,a.nf,a.BC,a.ai,p.MD,p.Sq]}),s})();var I=c(342),E=c(1266),x=c(9183);const b=["pantryList"];function k(i,s){1&i&&t.nrm(0,"div",16,0)}function v(i,s){if(1&i){const o=t.RV6();t.j41(0,"div",17)(1,"ion-grid")(2,"ion-row",18)(3,"ion-col",19)(4,"ion-button",20),t.bIt("mouseup",function(){t.eBV(o);const n=t.XpG();return t.Njj(n.deleteSelected())}),t.EFF(5,"Delete Items"),t.k0s(),t.j41(6,"ion-button",20),t.bIt("mouseup",function(){t.eBV(o);const n=t.XpG();return t.Njj(n.addSelectedtoShopping())}),t.EFF(7,"Add Items to Shopping List"),t.k0s()()()()()}}function F(i,s){if(1&i){const o=t.RV6();t.j41(0,"ion-button",11),t.bIt("click",function(){t.eBV(o);const n=t.XpG();return t.Njj(n.selectAll(!0))}),t.EFF(1,"Select All"),t.k0s()}}function S(i,s){if(1&i){const o=t.RV6();t.j41(0,"ion-button",11),t.bIt("click",function(){t.eBV(o);const n=t.XpG();return t.Njj(n.selectAll(!1))}),t.EFF(1,"Deselect All"),t.k0s()}}function D(i,s){1&i&&(t.j41(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),t.EFF(3,"Pantry Inventory"),t.k0s()(),t.j41(4,"ion-list")(5,"ion-item"),t.EFF(6," List is Empty. "),t.k0s()()())}function T(i,s){if(1&i&&t.nrm(0,"ion-icon",29),2&i){const o=t.XpG().$implicit;t.xc7("color",o.expColor)}}function C(i,s){1&i&&t.nrm(0,"ion-icon",30),2&i&&t.xc7("color","red")}function j(i,s){if(1&i){const o=t.RV6();t.j41(0,"ion-item",23)(1,"ion-checkbox",24),t.mxI("ngModelChange",function(n){const r=t.eBV(o).$implicit;return t.DH7(r.selected,n)||(r.selected=n),t.Njj(n)}),t.bIt("ionChange",function(){const n=t.eBV(o).$implicit,r=t.XpG(4);return t.Njj(r.updateSelection(n))}),t.k0s(),t.j41(2,"p",25),t.EFF(3),t.k0s(),t.j41(4,"p",26),t.EFF(5),t.k0s(),t.DNE(6,T,1,2,"ion-icon",27)(7,C,1,2,"ion-icon",28),t.k0s()}if(2&i){const o=s.$implicit;t.R7$(),t.R50("ngModel",o.selected),t.R7$(2),t.JRh(o.name),t.R7$(2),t.JRh(o.expirationToString()),t.R7$(),t.Y8G("ngIf",o.daysUntilExpire>0),t.R7$(),t.Y8G("ngIf",o.daysUntilExpire<=0)}}function R(i,s){if(1&i&&(t.j41(0,"ion-item-group")(1,"ion-item-divider")(2,"ion-label"),t.EFF(3),t.k0s()(),t.DNE(4,j,8,5,"ion-item",22),t.k0s()),2&i){const o=t.XpG().$implicit,e=t.XpG(2);t.R7$(3),t.JRh(o),t.R7$(),t.Y8G("ngForOf",e.getItemsByCategory(o))}}function G(i,s){if(1&i&&(t.j41(0,"ion-list",null,1),t.DNE(2,R,5,2,"ion-item-group",12),t.k0s()),2&i){const o=s.$implicit,e=t.XpG(2);t.R7$(2),t.Y8G("ngIf",e.pantryHasCategory(o))}}function M(i,s){if(1&i&&(t.j41(0,"div"),t.DNE(1,G,3,1,"ion-list",21),t.k0s()),2&i){const o=t.XpG();t.R7$(),t.Y8G("ngForOf",o.categories)}}const O=[{path:"",component:(()=>{var i;class s{constructor(e,n,r,l,_,A,$,w,X){this.route=e,this.router=n,this.mc=r,this.shoppingService=l,this.ps=_,this.es=A,this.gestureCtrl=$,this.el=w,this.cdRef=X,this.pantryItems=new Map,this.itemsSelected=[],this.expiringItems=[],this.totalEntries=0,this.toolbarState="pantry",this.selectState="selectAll",this.pantryIsOccupied=!1,this.categories=g.E.categories,this.modalOpened=!1,this.blurBackground=!1}ngOnInit(){var e=this;this.route.queryParams.subscribe(function(){var r=(0,u.A)(function*(l){"true"===l.addItem&&(e.modalOpened=!0,yield e.addPantryItem(),e.clearQueryParams())});return function(l){return r.apply(this,arguments)}}()),this.pantryItems=this.ps.getPantryList(),this.totalEntries=this.pantryItems.size,this.pantryIsOccupied=this.pantryItems.size>0,[{name:"Apple",category:"Fruits",expirationDate:new Date("2024-06-4")},{name:"Banana",category:"Fruits",expirationDate:new Date("2024-06-30")},{name:"Spinach",category:"Vegetables",expirationDate:new Date("2024-06-3")},{name:"Milk",category:"Dairy",expirationDate:new Date("2024-06-1")},{name:"Beef",category:"Meats",expirationDate:new Date("2024-07-02")},{name:"Salmon",category:"Seafood",expirationDate:new Date("2024-07-05")},{name:"Rice",category:"Grains and Cereals",expirationDate:new Date("2024-07-15")},{name:"Bread",category:"Bread and Bakery",expirationDate:new Date("2024-07-12")},{name:"Pasta",category:"Pantry Goods",expirationDate:new Date("2024-07-15")},{name:"Ice Cream",category:"Frozen Foods",expirationDate:new Date("2024-06-07")},{name:"Orange Juice",category:"Beverages",expirationDate:new Date("2024-07-25")},{name:"Chips",category:"Snacks",expirationDate:new Date("2024-07-28")},{name:"Ketchup",category:"Condiments",expirationDate:new Date("2024-08-01")},{name:"Salt",category:"Seasonings",expirationDate:new Date("2024-08-05")},{name:"Olive Oil",category:"Oils and Vinegars",expirationDate:new Date("2024-08-10")}].forEach(r=>{const l=new g.E(r.name,r.category,r.expirationDate);this.addToCategory(l)})}ngAfterViewInit(){this.checkForExpiringItems(),this.gestureCtrl.create({el:this.pantryList.nativeElement.closest("ion-content"),onStart:()=>this.onStart(),onMove:n=>this.onMove(n),onEnd:()=>this.onEnd(),gestureName:"testing",blurOnStart:!0}).enable()}onStart(){console.log("STARTED"),this.itemsSelected.length>0&&(this.blurBackground=!0),this.cdRef.detectChanges()}onMove(e){console.log("MOVING")}onEnd(){console.log("ENDED"),this.blurBackground=!1,this.cdRef.detectChanges()}clearQueryParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{addItem:null},queryParamsHandling:"merge"})}addPantryItem(){var e=this;return(0,u.A)(function*(){const n=yield e.mc.create({component:y.Y,componentProps:{type:"Pantry"}});n.present();const{data:r,role:l}=yield n.onWillDismiss();"confirm"===l&&e.addToCategory(r)})()}addToCategory(e){this.ps.addPantryItem(e.category,e),this.updatePantryState()}checkForExpiringItems(){this.expiringItems=[],this.pantryItems.forEach(e=>{e.forEach(n=>{n.daysUntilExpire<=0&&this.expiringItems.push(n)})}),this.expiringItems.length>0&&this.showExpiringItemsModal()}showExpiringItemsModal(){var e=this;return(0,u.A)(function*(){const n=yield e.mc.create({component:f,componentProps:{expiringItems:e.getExpiringItems()}});n.present();const{role:l}=yield n.onWillDismiss();"confirm"===l&&e.expiringItems.forEach(_=>e.deleteItem(_))})()}updatePantryState(){this.pantryItems=this.ps.getPantryList(),this.totalEntries=Array.from(this.pantryItems.values()).reduce((e,n)=>e+n.length,0),this.pantryIsOccupied=this.totalEntries>0}pantryHasCategory(e){return this.pantryItems.has(e)&&this.pantryItems.get(e).length>0}getItemsByCategory(e){return this.pantryItems.get(e)||[]}updateSelection(e){e.selected?this.itemsSelected.push(e):this.itemsSelected.splice(this.itemsSelected.indexOf(e),1)}setSelectState(e){this.selectState=e}selectAll(e){this.pantryItems.forEach(n=>{g.E.selectedAll(n,e),n.forEach(r=>this.updateSelection(r))}),this.setSelectState(this.itemsSelected.length==this.totalEntries?"deselectAll":"selectAll")}deleteItem(e){const n=this.pantryItems.get(e.category);n.splice(n.indexOf(e),1),this.totalEntries--,this.removeExpirtionTracking(e),0==this.totalEntries&&(this.pantryIsOccupied=!1)}deleteSelected(){this.pantryItems.forEach((e,n)=>{e.forEach(r=>{r.selected&&this.deleteItem(r)})})}addToShoppingList(e){this.shoppingService.itemIsInList(e)||this.shoppingService.addItemToList(e)}addSelectedtoShopping(){this.pantryItems.forEach(e=>{e.forEach(n=>{n.selected&&this.addToShoppingList(n)})})}addExpirationTracking(e){Array.isArray(e)?e.forEach(n=>{this.es.isItemTracked(n)||this.es.trackItem(n)}):this.es.isItemTracked(e)||this.es.trackItem(e)}removeExpirtionTracking(e){Array.isArray(e)?e.forEach(n=>{this.es.removeItemTracking(n)}):this.es.removeItemTracking(e)}getExpiringItems(){return this.expiringItems}}return(i=s).\u0275fac=function(e){return new(e||i)(t.rXU(m.nX),t.rXU(m.Ix),t.rXU(a.W3),t.rXU(I._),t.rXU(E.Q),t.rXU(x.x),t.rXU(a.wH),t.rXU(t.aKT),t.rXU(t.gRc))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-pantry"]],viewQuery:function(e,n){if(1&e&&t.GBs(b,5,t.aKT),2&e){let r;t.mGM(r=t.lsd())&&(n.pantryList=r.first)}},decls:26,vars:8,consts:[["coverblur",""],["pantryList",""],["id","coverblur",4,"ngIf"],["id","blurOptions",4,"ngIf"],[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],[3,"click",4,"ngIf"],["color","danger",3,"click"],["color","success",3,"click"],[3,"click"],[4,"ngIf"],["horizontal","center","vertical","bottom","slot","fixed"],["id","pantryAddModal",3,"click"],["name","add"],["id","coverblur"],["id","blurOptions"],[1,"ion-align-items-center"],[1,"ion-text-center","gx-0"],["size","large",3,"mouseup"],[4,"ngFor","ngForOf"],["class","noselect",4,"ngFor","ngForOf"],[1,"noselect"],["slot","start",3,"ngModelChange","ionChange","ngModel"],[2,"font-size","medium"],["slot","end",2,"font-size","small"],["slot","end","name","nutrition",3,"color",4,"ngIf"],["name","alert-outline","slot","end",3,"color",4,"ngIf"],["slot","end","name","nutrition"],["name","alert-outline","slot","end"]],template:function(e,n){1&e&&(t.DNE(0,k,2,0,"div",2)(1,v,8,0,"div",3),t.j41(2,"ion-header",4)(3,"ion-toolbar")(4,"ion-title"),t.EFF(5,"Pantry"),t.k0s()()(),t.j41(6,"ion-content",5)(7,"ion-header",6)(8,"ion-toolbar")(9,"ion-title",7),t.EFF(10,"Pantry"),t.k0s()()(),t.j41(11,"ion-toolbar")(12,"ion-buttons"),t.DNE(13,F,2,0,"ion-button",8)(14,S,2,0,"ion-button",8),t.j41(15,"ion-button",9),t.bIt("click",function(){return n.deleteSelected()}),t.EFF(16,"Delete"),t.k0s(),t.j41(17,"ion-button",10),t.bIt("click",function(){return n.addSelectedtoShopping()}),t.EFF(18,"Add to Shopping List"),t.k0s(),t.j41(19,"ion-button",11),t.bIt("click",function(){return n.addExpirationTracking(n.itemsSelected)}),t.EFF(20,"Track Expiration"),t.k0s()()(),t.DNE(21,D,7,0,"ion-card",12)(22,M,2,1,"div",12),t.j41(23,"ion-fab",13)(24,"ion-fab-button",14),t.bIt("click",function(){return n.addPantryItem()}),t.nrm(25,"ion-icon",15),t.k0s()()()),2&e&&(t.Y8G("ngIf",n.blurBackground),t.R7$(),t.Y8G("ngIf",n.blurBackground),t.R7$(),t.Y8G("translucent",!0),t.R7$(4),t.Y8G("fullscreen",!0),t.R7$(7),t.Y8G("ngIf","selectAll"==n.selectState),t.R7$(),t.Y8G("ngIf","deselectAll"==n.selectState),t.R7$(7),t.Y8G("ngIf",!n.pantryIsOccupied),t.R7$(),t.Y8G("ngIf",n.pantryIsOccupied))},dependencies:[p.Sq,p.bT,d.BC,d.vS,a.Jm,a.QW,a.b_,a.ME,a.tN,a.eY,a.hU,a.W9,a.Q8,a.YW,a.lO,a.eU,a.iq,a.uz,a.Dg,a.jh,a.he,a.nf,a.ln,a.BC,a.ai,a.hB],styles:[".noselect[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}#coverblur[_ngcontent-%COMP%]{display:flex;position:absolute;z-index:1000;left:0;background-color:#00000041;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}#blurOptions[_ngcontent-%COMP%]{z-index:1001;position:absolute;left:0;right:0;bottom:50px;margin:auto}"]}),s})()}];let N=(()=>{var i;class s{}return(i=s).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[m.iI.forChild(O),m.iI]}),s})(),B=(()=>{var i;class s{}return(i=s).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[p.MD,d.YN,a.bv,N,f]}),s})()}}]);