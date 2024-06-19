import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { OrderComponent } from './order/order.component';
import { LogoutComponent } from './logout/logout.component';
import {adminGuard} from "./auth/auth.admin.guard";
import {PromoCodesComponent} from "./promo-codes/promo-codes.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AdminComponent} from "./admin/admin.component";
import {AddVariantOptionComponent} from "./admin/add-variant-option/add-variant-option.component";
import {UpdateVariantOptionComponent} from "./admin/update-variant-option/update-variant-option.component";
import {DeleteVariantOptionComponent} from "./admin/delete-variant-option/delete-variant-option.component";
import {GiftcardsOptionComponent} from "./admin/giftcards-option/giftcards-option.component";
import {TopupComponent} from "./topup/topup.component";
import {GiftCardComponent} from "./products/giftcard/giftcard.component";


export const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'auth/login', component: LoginComponent },
  {path: 'auth/register', component: RegisterComponent},
  {path: 'order', component: OrderComponent, canActivate: [authGuard] },
  {path: 'promo-codes', component: PromoCodesComponent, canActivate: [adminGuard]},
  {path: 'products', component: ProductsComponent },
  {path: 'products/giftcard', component: GiftCardComponent },
  {path: 'topup', component: TopupComponent },
  {path: 'products/:id', component:ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [authGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin/add-variant/:id', component: AddVariantOptionComponent },
  { path: 'admin/update-variant/:id', component: UpdateVariantOptionComponent },
  { path: 'admin/delete-variant/:id', component: DeleteVariantOptionComponent },
  { path: 'admin/giftcards-option', component: GiftcardsOptionComponent },

];
// , canActivate: [authGuard]