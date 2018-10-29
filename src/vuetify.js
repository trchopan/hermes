import Vue from "vue";
import Vuetify from "vuetify/lib";
import {
  VApp,
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
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileAction,
  VProgressLinear,
  VBtn,
  VIcon,
  VSpacer
  // transitions
} from "vuetify/lib/components";
import { Ripple } from "vuetify/lib/directives";
import "vuetify/src/stylus/app.styl";

const components = {
  VApp,
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
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileAction,
  VProgressLinear,
  VBtn,
  VIcon,
  VSpacer
  // transitions
};
const directives = {
  Ripple
};

Vue.use(Vuetify, { components, directives });
