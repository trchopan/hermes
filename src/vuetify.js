import Vue from "vue";
import Vuetify from "vuetify/lib";
import {
  VApp,
  VAvatar,
  VContainer,
  VContent,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VDivider,
  VForm,
  VTextField,
  VTooltip,
  VToolbar,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems,
  VMenu,
  VMenuTransition,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VListTileAction,
  VProgressLinear,
  VBtn,
  VIcon,
  VSwitch,
  VSpacer
  // transitions
} from "vuetify/lib/components";
import { Ripple } from "vuetify/lib/directives";
import "vuetify/src/stylus/app.styl";

const components = {
  VApp,
  VAvatar,
  VContainer,
  VContent,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VDivider,
  VForm,
  VTextField,
  VTooltip,
  VToolbar,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems,
  VMenu,
  VMenuTransition,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VListTileAction,
  VProgressLinear,
  VBtn,
  VIcon,
  VSwitch,
  VSpacer
  // transitions
};
const directives = {
  Ripple
};

Vue.use(Vuetify, {
  components,
  directives
});
