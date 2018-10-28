import Vue from "vue";
import Vuetify from "vuetify/es5";
import {
  VApp,
  VContainer,
  VContent,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
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
  VBtn,
  VIcon,
  VSpacer,
  transitions
} from "vuetify/es5/components";
import { Ripple } from "vuetify/es5/directives";
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
  VBtn,
  VIcon,
  VSpacer,
  transitions
};
const directives = {
  Ripple
};

Vue.use(Vuetify, { components, directives });
