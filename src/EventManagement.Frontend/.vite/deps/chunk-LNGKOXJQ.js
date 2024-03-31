import {
  FirstPage_default,
  LastPage_default
} from "./chunk-GHKTJBPE.js";
import {
  MenuItem_default,
  Select_default
} from "./chunk-WSFVVCM2.js";
import {
  IconButton_default,
  InputBase_default,
  KeyboardArrowLeft_default,
  KeyboardArrowRight_default,
  formControlState,
  useFormControl
} from "./chunk-6KJ5WMDR.js";
import {
  ButtonBase_default
} from "./chunk-3JUN2JQV.js";
import {
  isHostComponent,
  useBadge,
  useSlotProps
} from "./chunk-I3ZJTL7M.js";
import {
  Typography_default
} from "./chunk-QO4BDEDF.js";
import {
  createSvgIcon,
  init_createSvgIcon,
  init_useControlled,
  init_useId,
  useControlled_default,
  useId_default
} from "./chunk-UFLBAJNH.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-A4JSYAUA.js";
import {
  init_composeClasses
} from "./chunk-I7HKBVYL.js";
import {
  useTheme
} from "./chunk-KRZM5VIA.js";
import {
  createTheme_default,
  identifier_default,
  init_generateUtilityClass,
  init_identifier,
  init_styled,
  init_useThemeProps,
  rootShouldForwardProp,
  styled_default,
  useThemeProps
} from "./chunk-B7RNAU2U.js";
import {
  ClassNameGenerator_default,
  _objectWithoutPropertiesLoose,
  alpha,
  chainPropTypes,
  clsx_default,
  composeClasses,
  createBox,
  createStack,
  darken,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_esm,
  init_esm2,
  init_objectWithoutPropertiesLoose,
  integerPropType_default,
  lighten,
  refType_default,
  require_jsx_runtime,
  usePreviousProps_default
} from "./chunk-KUPFN3OA.js";
import {
  require_prop_types
} from "./chunk-7Z7URJP5.js";
import {
  require_react
} from "./chunk-LNTNMRP6.js";
import {
  _extends,
  init_extends
} from "./chunk-LA4EM3QP.js";
import {
  __toESM
} from "./chunk-FWVXXLA5.js";

// node_modules/@mui/material/Badge/badgeClasses.js
init_esm();
init_generateUtilityClass();
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeClasses = generateUtilityClasses("MuiBadge", [
  "root",
  "badge",
  "dot",
  "standard",
  "anchorOriginTopRight",
  "anchorOriginBottomRight",
  "anchorOriginTopLeft",
  "anchorOriginBottomLeft",
  "invisible",
  "colorError",
  "colorInfo",
  "colorPrimary",
  "colorSecondary",
  "colorSuccess",
  "colorWarning",
  "overlapRectangular",
  "overlapCircular",
  // TODO: v6 remove the overlap value from these class keys
  "anchorOriginTopLeftCircular",
  "anchorOriginTopLeftRectangular",
  "anchorOriginTopRightCircular",
  "anchorOriginTopRightRectangular",
  "anchorOriginBottomLeftCircular",
  "anchorOriginBottomLeftRectangular",
  "anchorOriginBottomRightCircular",
  "anchorOriginBottomRightRectangular"
]);
var badgeClasses_default = badgeClasses;

// node_modules/@mui/material/Badge/Badge.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_styled();
init_useThemeProps();
init_capitalize();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["anchorOrigin", "className", "classes", "component", "components", "componentsProps", "children", "overlap", "color", "invisible", "max", "badgeContent", "slots", "slotProps", "showZero", "variant"];
var RADIUS_STANDARD = 10;
var RADIUS_DOT = 4;
var useUtilityClasses = (ownerState) => {
  const {
    color,
    anchorOrigin,
    invisible,
    overlap,
    variant,
    classes = {}
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", variant, invisible && "invisible", `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`, `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}${capitalize_default(overlap)}`, `overlap${capitalize_default(overlap)}`, color !== "default" && `color${capitalize_default(color)}`]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
var BadgeRoot = styled_default("span", {
  name: "MuiBadge",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  position: "relative",
  display: "inline-flex",
  // For correct alignment with the text.
  verticalAlign: "middle",
  flexShrink: 0
});
var BadgeBadge = styled_default("span", {
  name: "MuiBadge",
  slot: "Badge",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.badge, styles[ownerState.variant], styles[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}${capitalize_default(ownerState.overlap)}`], ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`], ownerState.invisible && styles.invisible];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  position: "absolute",
  boxSizing: "border-box",
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: "0 6px",
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  // Render the badge on top of potential ripples.
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  })
}, ownerState.color !== "default" && {
  backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
  color: (theme.vars || theme).palette[ownerState.color].contrastText
}, ownerState.variant === "dot" && {
  borderRadius: RADIUS_DOT,
  height: RADIUS_DOT * 2,
  minWidth: RADIUS_DOT * 2,
  padding: 0
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "rectangular" && {
  top: 0,
  right: 0,
  transform: "scale(1) translate(50%, -50%)",
  transformOrigin: "100% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "rectangular" && {
  bottom: 0,
  right: 0,
  transform: "scale(1) translate(50%, 50%)",
  transformOrigin: "100% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "rectangular" && {
  top: 0,
  left: 0,
  transform: "scale(1) translate(-50%, -50%)",
  transformOrigin: "0% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "rectangular" && {
  bottom: 0,
  left: 0,
  transform: "scale(1) translate(-50%, 50%)",
  transformOrigin: "0% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "circular" && {
  top: "14%",
  right: "14%",
  transform: "scale(1) translate(50%, -50%)",
  transformOrigin: "100% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "circular" && {
  bottom: "14%",
  right: "14%",
  transform: "scale(1) translate(50%, 50%)",
  transformOrigin: "100% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "circular" && {
  top: "14%",
  left: "14%",
  transform: "scale(1) translate(-50%, -50%)",
  transformOrigin: "0% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "circular" && {
  bottom: "14%",
  left: "14%",
  transform: "scale(1) translate(-50%, 50%)",
  transformOrigin: "0% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, 50%)"
  }
}, ownerState.invisible && {
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen
  })
}));
var Badge = React.forwardRef(function Badge2(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$badge, _slotProps$root, _slotProps$badge;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBadge"
  });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: "top",
      horizontal: "right"
    },
    className,
    component,
    components = {},
    componentsProps = {},
    children,
    overlap: overlapProp = "rectangular",
    color: colorProp = "default",
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots,
    slotProps,
    showZero = false,
    variant: variantProp = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero
  });
  const prevProps = usePreviousProps_default({
    anchorOrigin: anchorOriginProp,
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp
  });
  const invisible = invisibleFromHook || badgeContent == null && variantProp !== "dot";
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const displayValue = variant !== "dot" ? displayValueFromHook : void 0;
  const ownerState = _extends({}, props, {
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : BadgeRoot;
  const BadgeSlot = (_ref2 = (_slots$badge = slots == null ? void 0 : slots.badge) != null ? _slots$badge : components.Badge) != null ? _ref2 : BadgeBadge;
  const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
  const badgeSlotProps = (_slotProps$badge = slotProps == null ? void 0 : slotProps.badge) != null ? _slotProps$badge : componentsProps.badge;
  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component
    },
    ownerState,
    className: clsx_default(rootSlotProps == null ? void 0 : rootSlotProps.className, classes.root, className)
  });
  const badgeProps = useSlotProps({
    elementType: BadgeSlot,
    externalSlotProps: badgeSlotProps,
    ownerState,
    className: clsx_default(classes.badge, badgeSlotProps == null ? void 0 : badgeSlotProps.className)
  });
  return (0, import_jsx_runtime2.jsxs)(RootSlot, _extends({}, rootProps, {
    children: [children, (0, import_jsx_runtime.jsx)(BadgeSlot, _extends({}, badgeProps, {
      children: displayValue
    }))]
  }));
});
true ? Badge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: import_prop_types.default.shape({
    horizontal: import_prop_types.default.oneOf(["left", "right"]).isRequired,
    vertical: import_prop_types.default.oneOf(["bottom", "top"]).isRequired
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: import_prop_types.default.node,
  /**
   * The badge will be added relative to this node.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'default'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: import_prop_types.default.shape({
    Badge: import_prop_types.default.elementType,
    Root: import_prop_types.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    badge: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: import_prop_types.default.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: import_prop_types.default.number,
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: import_prop_types.default.oneOf(["circular", "rectangular"]),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: import_prop_types.default.bool,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    badge: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    badge: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["dot", "standard"]), import_prop_types.default.string])
} : void 0;
var Badge_default = Badge;

// node_modules/@mui/material/Box/Box.js
init_esm2();
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_esm();

// node_modules/@mui/material/Box/Box.js
init_identifier();
var defaultTheme = createTheme_default();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types2.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
} : void 0;
var Box_default = Box;

// node_modules/@mui/material/Checkbox/checkboxClasses.js
init_esm();
init_generateUtilityClass();
function getCheckboxUtilityClass(slot) {
  return generateUtilityClass("MuiCheckbox", slot);
}
var checkboxClasses = generateUtilityClasses("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]);
var checkboxClasses_default = checkboxClasses;

// node_modules/@mui/material/Checkbox/Checkbox.js
init_objectWithoutPropertiesLoose();
init_extends();
var React6 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_esm2();

// node_modules/@mui/material/internal/SwitchBase.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_capitalize();
init_styled();
init_useControlled();

// node_modules/@mui/material/internal/switchBaseClasses.js
init_esm();
init_generateUtilityClass();
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
var switchBaseClasses = generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);

// node_modules/@mui/material/internal/SwitchBase.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded2 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize_default(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
var SwitchBaseRoot = styled_default(ButtonBase_default)(({
  ownerState
}) => _extends({
  padding: 9,
  borderRadius: "50%"
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}));
var SwitchBaseInput = styled_default("input")({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
var SwitchBase = React2.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const [checked, setCheckedState] = useControlled_default({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses2(ownerState);
  return (0, import_jsx_runtime4.jsxs)(SwitchBaseRoot, _extends({
    component: "span",
    className: clsx_default(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    tabIndex: null,
    role: void 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState,
    ref
  }, other, {
    children: [(0, import_jsx_runtime3.jsx)(SwitchBaseInput, _extends({
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      className: classes.input,
      disabled,
      id: hasLabelFor ? id : void 0,
      name,
      onChange: handleInputChange,
      readOnly,
      ref: inputRef,
      required,
      ownerState,
      tabIndex,
      type
    }, type === "checkbox" && value === void 0 ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
});
true ? SwitchBase.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: import_prop_types3.default.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types3.default.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: import_prop_types3.default.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: import_prop_types3.default.object,
  /**
   * @ignore
   */
  className: import_prop_types3.default.string,
  /**
   * @ignore
   */
  defaultChecked: import_prop_types3.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types3.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types3.default.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: import_prop_types3.default.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: import_prop_types3.default.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types3.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types3.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /*
   * @ignore
   */
  name: import_prop_types3.default.string,
  /**
   * @ignore
   */
  onBlur: import_prop_types3.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types3.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types3.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: import_prop_types3.default.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: import_prop_types3.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.object,
  /**
   * @ignore
   */
  tabIndex: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string]),
  /**
   * The input component prop `type`.
   */
  type: import_prop_types3.default.string.isRequired,
  /**
   * The value of the component.
   */
  value: import_prop_types3.default.any
} : void 0;
var SwitchBase_default = SwitchBase;

// node_modules/@mui/material/internal/svg-icons/CheckBoxOutlineBlank.js
var React3 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var CheckBoxOutlineBlank_default = createSvgIcon((0, import_jsx_runtime5.jsx)("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank");

// node_modules/@mui/material/internal/svg-icons/CheckBox.js
var React4 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var CheckBox_default = createSvgIcon((0, import_jsx_runtime6.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox");

// node_modules/@mui/material/internal/svg-icons/IndeterminateCheckBox.js
var React5 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var IndeterminateCheckBox_default = createSvgIcon((0, import_jsx_runtime7.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");

// node_modules/@mui/material/Checkbox/Checkbox.js
init_capitalize();
init_useThemeProps();
init_styled();
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var _excluded3 = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size", "className"];
var useUtilityClasses3 = (ownerState) => {
  const {
    classes,
    indeterminate,
    color,
    size
  } = ownerState;
  const slots = {
    root: ["root", indeterminate && "indeterminate", `color${capitalize_default(color)}`, `size${capitalize_default(size)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var CheckboxRoot = styled_default(SwitchBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, !ownerState.disableRipple && {
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === "default" ? theme.vars.palette.action.activeChannel : theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(ownerState.color === "default" ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${checkboxClasses_default.checked}, &.${checkboxClasses_default.indeterminate}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${checkboxClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));
var defaultCheckedIcon = (0, import_jsx_runtime8.jsx)(CheckBox_default, {});
var defaultIcon = (0, import_jsx_runtime8.jsx)(CheckBoxOutlineBlank_default, {});
var defaultIndeterminateIcon = (0, import_jsx_runtime8.jsx)(IndeterminateCheckBox_default, {});
var Checkbox = React6.forwardRef(function Checkbox2(inProps, ref) {
  var _icon$props$fontSize, _indeterminateIcon$pr;
  const props = useThemeProps({
    props: inProps,
    name: "MuiCheckbox"
  });
  const {
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = "medium",
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = _extends({}, props, {
    color,
    indeterminate,
    size
  });
  const classes = useUtilityClasses3(ownerState);
  return (0, import_jsx_runtime8.jsx)(CheckboxRoot, _extends({
    type: "checkbox",
    inputProps: _extends({
      "data-indeterminate": indeterminate
    }, inputProps),
    icon: React6.cloneElement(icon, {
      fontSize: (_icon$props$fontSize = icon.props.fontSize) != null ? _icon$props$fontSize : size
    }),
    checkedIcon: React6.cloneElement(indeterminateIcon, {
      fontSize: (_indeterminateIcon$pr = indeterminateIcon.props.fontSize) != null ? _indeterminateIcon$pr : size
    }),
    ownerState,
    ref,
    className: clsx_default(classes.root, className)
  }, other, {
    classes
  }));
});
true ? Checkbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types4.default.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: import_prop_types4.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * @ignore
   */
  className: import_prop_types4.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types4.default.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: import_prop_types4.default.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types4.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: import_prop_types4.default.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: import_prop_types4.default.node,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types4.default.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: import_prop_types4.default.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: import_prop_types4.default.node,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types4.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types4.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: import_prop_types4.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["medium", "small"]), import_prop_types4.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: import_prop_types4.default.any
} : void 0;
var Checkbox_default = Checkbox;

// node_modules/@mui/material/Stack/Stack.js
var import_prop_types5 = __toESM(require_prop_types());
init_esm2();
init_styled();
init_useThemeProps();
var Stack = createStack({
  createStyledComponent: styled_default("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (props, styles) => styles.root
  }),
  useThemeProps: (inProps) => useThemeProps({
    props: inProps,
    name: "MuiStack"
  })
});
true ? Stack.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types5.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types5.default.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types5.default.arrayOf(import_prop_types5.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types5.default.object]),
  /**
   * Add an element between each child.
   */
  divider: import_prop_types5.default.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string])), import_prop_types5.default.number, import_prop_types5.default.object, import_prop_types5.default.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: import_prop_types5.default.bool
} : void 0;
var Stack_default = Stack;

// node_modules/@mui/material/Stack/stackClasses.js
init_esm();
init_generateUtilityClass();
var stackClasses = generateUtilityClasses("MuiStack", ["root"]);
var stackClasses_default = stackClasses;

// node_modules/@mui/material/FormControlLabel/formControlLabelClasses.js
init_esm();
init_generateUtilityClass();
function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControlLabel", slot);
}
var formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label", "error", "required", "asterisk"]);
var formControlLabelClasses_default = formControlLabelClasses;

// node_modules/@mui/material/FormControlLabel/FormControlLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React7 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_capitalize();
init_styled();
init_useThemeProps();
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var _excluded4 = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "required", "slotProps", "value"];
var useUtilityClasses4 = (ownerState) => {
  const {
    classes,
    disabled,
    labelPlacement,
    error,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", `labelPlacement${capitalize_default(labelPlacement)}`, error && "error", required && "required"],
    label: ["label", disabled && "disabled"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
var FormControlLabelRoot = styled_default("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses_default.label}`]: styles.label
    }, styles.root, styles[`labelPlacement${capitalize_default(ownerState.labelPlacement)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  // For correct alignment with the text.
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${formControlLabelClasses_default.disabled}`]: {
    cursor: "default"
  }
}, ownerState.labelPlacement === "start" && {
  flexDirection: "row-reverse",
  marginLeft: 16,
  // used for row presentation of radio/checkbox
  marginRight: -11
}, ownerState.labelPlacement === "top" && {
  flexDirection: "column-reverse",
  marginLeft: 16
}, ownerState.labelPlacement === "bottom" && {
  flexDirection: "column",
  marginLeft: 16
}, {
  [`& .${formControlLabelClasses_default.label}`]: {
    [`&.${formControlLabelClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled
    }
  }
}));
var AsteriskComponent = styled_default("span", {
  name: "MuiFormControlLabel",
  slot: "Asterisk",
  overridesResolver: (props, styles) => styles.asterisk
})(({
  theme
}) => ({
  [`&.${formControlLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var FormControlLabel = React7.forwardRef(function FormControlLabel2(inProps, ref) {
  var _ref, _slotProps$typography;
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormControlLabel"
  });
  const {
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    label: labelProp,
    labelPlacement = "end",
    required: requiredProp,
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const muiFormControl = useFormControl();
  const disabled = (_ref = disabledProp != null ? disabledProp : control.props.disabled) != null ? _ref : muiFormControl == null ? void 0 : muiFormControl.disabled;
  const required = requiredProp != null ? requiredProp : control.props.required;
  const controlProps = {
    disabled,
    required
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((key) => {
    if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") {
      controlProps[key] = props[key];
    }
  });
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["error"]
  });
  const ownerState = _extends({}, props, {
    disabled,
    labelPlacement,
    required,
    error: fcs.error
  });
  const classes = useUtilityClasses4(ownerState);
  const typographySlotProps = (_slotProps$typography = slotProps.typography) != null ? _slotProps$typography : componentsProps.typography;
  let label = labelProp;
  if (label != null && label.type !== Typography_default && !disableTypography) {
    label = (0, import_jsx_runtime9.jsx)(Typography_default, _extends({
      component: "span"
    }, typographySlotProps, {
      className: clsx_default(classes.label, typographySlotProps == null ? void 0 : typographySlotProps.className),
      children: label
    }));
  }
  return (0, import_jsx_runtime10.jsxs)(FormControlLabelRoot, _extends({
    className: clsx_default(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [React7.cloneElement(control, controlProps), required ? (0, import_jsx_runtime10.jsxs)(Stack_default, {
      direction: "row",
      alignItems: "center",
      children: [label, (0, import_jsx_runtime10.jsxs)(AsteriskComponent, {
        ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: [" ", "*"]
      })]
    }) : label]
  }));
});
true ? FormControlLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component appears selected.
   */
  checked: import_prop_types6.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  /**
   * @ignore
   */
  className: import_prop_types6.default.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: import_prop_types6.default.shape({
    typography: import_prop_types6.default.object
  }),
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: import_prop_types6.default.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: import_prop_types6.default.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: import_prop_types6.default.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: import_prop_types6.default.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: import_prop_types6.default.oneOf(["bottom", "end", "start", "top"]),
  /**
   * @ignore
   */
  name: import_prop_types6.default.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types6.default.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: import_prop_types6.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types6.default.shape({
    typography: import_prop_types6.default.object
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object]),
  /**
   * The value of the component.
   */
  value: import_prop_types6.default.any
} : void 0;
var FormControlLabel_default = FormControlLabel;

// node_modules/@mui/material/Switch/switchClasses.js
init_esm();
init_generateUtilityClass();
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
var switchClasses_default = switchClasses;

// node_modules/@mui/material/Switch/Switch.js
init_objectWithoutPropertiesLoose();
init_extends();
var React8 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_esm2();
init_capitalize();
init_useThemeProps();
init_styled();
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var _excluded5 = ["className", "color", "edge", "size", "sx"];
var useUtilityClasses5 = (ownerState) => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", edge && `edge${capitalize_default(edge)}`, `size${capitalize_default(size)}`],
    switchBase: ["switchBase", `color${capitalize_default(color)}`, checked && "checked", disabled && "disabled"],
    thumb: ["thumb"],
    track: ["track"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var SwitchRoot = styled_default("span", {
  name: "MuiSwitch",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`], styles[`size${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: "middle",
  // For correct alignment with the text.
  "@media print": {
    colorAdjust: "exact"
  }
}, ownerState.edge === "start" && {
  marginLeft: -8
}, ownerState.edge === "end" && {
  marginRight: -8
}, ownerState.size === "small" && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${switchClasses_default.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${switchClasses_default.switchBase}`]: {
    padding: 4,
    [`&.${switchClasses_default.checked}`]: {
      transform: "translateX(16px)"
    }
  }
}));
var SwitchSwitchBase = styled_default(SwitchBase_default, {
  name: "MuiSwitch",
  slot: "SwitchBase",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.switchBase, {
      [`& .${switchClasses_default.input}`]: styles.input
    }, ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme
}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  // Render above the focus ripple.
  color: theme.vars ? theme.vars.palette.Switch.defaultColor : `${theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300]}`,
  transition: theme.transitions.create(["left", "transform"], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${switchClasses_default.checked}`]: {
    transform: "translateX(20px)"
  },
  [`&.${switchClasses_default.disabled}`]: {
    color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : `${theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]}`
  },
  [`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: {
    opacity: 0.5
  },
  [`&.${switchClasses_default.disabled} + .${switchClasses_default.track}`]: {
    opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : `${theme.palette.mode === "light" ? 0.12 : 0.2}`
  },
  [`& .${switchClasses_default.input}`]: {
    left: "-100%",
    width: "300%"
  }
}), ({
  theme,
  ownerState
}) => _extends({
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${switchClasses_default.checked}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main,
    "&:hover": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${switchClasses_default.disabled}`]: {
      color: theme.vars ? theme.vars.palette.Switch[`${ownerState.color}DisabledColor`] : `${theme.palette.mode === "light" ? lighten(theme.palette[ownerState.color].main, 0.62) : darken(theme.palette[ownerState.color].main, 0.55)}`
    }
  },
  [`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main
  }
}));
var SwitchTrack = styled_default("span", {
  name: "MuiSwitch",
  slot: "Track",
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => ({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(["opacity", "background-color"], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : `${theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white}`,
  opacity: theme.vars ? theme.vars.opacity.switchTrack : `${theme.palette.mode === "light" ? 0.38 : 0.3}`
}));
var SwitchThumb = styled_default("span", {
  name: "MuiSwitch",
  slot: "Thumb",
  overridesResolver: (props, styles) => styles.thumb
})(({
  theme
}) => ({
  boxShadow: (theme.vars || theme).shadows[1],
  backgroundColor: "currentColor",
  width: 20,
  height: 20,
  borderRadius: "50%"
}));
var Switch = React8.forwardRef(function Switch2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSwitch"
  });
  const {
    className,
    color = "primary",
    edge = false,
    size = "medium",
    sx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const ownerState = _extends({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses5(ownerState);
  const icon = (0, import_jsx_runtime11.jsx)(SwitchThumb, {
    className: classes.thumb,
    ownerState
  });
  return (0, import_jsx_runtime12.jsxs)(SwitchRoot, {
    className: clsx_default(classes.root, className),
    sx,
    ownerState,
    children: [(0, import_jsx_runtime11.jsx)(SwitchSwitchBase, _extends({
      type: "checkbox",
      icon,
      checkedIcon: icon,
      ref,
      ownerState
    }, other, {
      classes: _extends({}, classes, {
        root: classes.switchBase
      })
    })), (0, import_jsx_runtime11.jsx)(SwitchTrack, {
      className: classes.track,
      ownerState
    })]
  });
});
true ? Switch.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types7.default.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: import_prop_types7.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types7.default.object,
  /**
   * @ignore
   */
  className: import_prop_types7.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types7.default.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: import_prop_types7.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types7.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: import_prop_types7.default.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: import_prop_types7.default.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: import_prop_types7.default.node,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types7.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types7.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types7.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: import_prop_types7.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["medium", "small"]), import_prop_types7.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: import_prop_types7.default.any
} : void 0;
var Switch_default = Switch;

// node_modules/@mui/material/TableCell/tableCellClasses.js
init_esm();
init_generateUtilityClass();
function getTableCellUtilityClass(slot) {
  return generateUtilityClass("MuiTableCell", slot);
}
var tableCellClasses = generateUtilityClasses("MuiTableCell", ["root", "head", "body", "footer", "sizeSmall", "sizeMedium", "paddingCheckbox", "paddingNone", "alignLeft", "alignCenter", "alignRight", "alignJustify", "stickyHeader"]);
var tableCellClasses_default = tableCellClasses;

// node_modules/@mui/material/TableCell/TableCell.js
init_objectWithoutPropertiesLoose();
init_extends();
var React11 = __toESM(require_react());
var import_prop_types8 = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_esm2();
init_capitalize();

// node_modules/@mui/material/Table/TableContext.js
var React9 = __toESM(require_react());
var TableContext = React9.createContext();
if (true) {
  TableContext.displayName = "TableContext";
}
var TableContext_default = TableContext;

// node_modules/@mui/material/Table/Tablelvl2Context.js
var React10 = __toESM(require_react());
var Tablelvl2Context = React10.createContext();
if (true) {
  Tablelvl2Context.displayName = "Tablelvl2Context";
}
var Tablelvl2Context_default = Tablelvl2Context;

// node_modules/@mui/material/TableCell/TableCell.js
init_useThemeProps();
init_styled();
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _excluded6 = ["align", "className", "component", "padding", "scope", "size", "sortDirection", "variant"];
var useUtilityClasses6 = (ownerState) => {
  const {
    classes,
    variant,
    align,
    padding,
    size,
    stickyHeader
  } = ownerState;
  const slots = {
    root: ["root", variant, stickyHeader && "stickyHeader", align !== "inherit" && `align${capitalize_default(align)}`, padding !== "normal" && `padding${capitalize_default(padding)}`, `size${capitalize_default(size)}`]
  };
  return composeClasses(slots, getTableCellUtilityClass, classes);
};
var TableCellRoot = styled_default("td", {
  name: "MuiTableCell",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${capitalize_default(ownerState.size)}`], ownerState.padding !== "normal" && styles[`padding${capitalize_default(ownerState.padding)}`], ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`], ownerState.stickyHeader && styles.stickyHeader];
  }
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body2, {
  display: "table-cell",
  verticalAlign: "inherit",
  // Workaround for a rendering bug with spanned columns in Chrome 62.0.
  // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
  borderBottom: theme.vars ? `1px solid ${theme.vars.palette.TableCell.border}` : `1px solid
    ${theme.palette.mode === "light" ? lighten(alpha(theme.palette.divider, 1), 0.88) : darken(alpha(theme.palette.divider, 1), 0.68)}`,
  textAlign: "left",
  padding: 16
}, ownerState.variant === "head" && {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: theme.typography.pxToRem(24),
  fontWeight: theme.typography.fontWeightMedium
}, ownerState.variant === "body" && {
  color: (theme.vars || theme).palette.text.primary
}, ownerState.variant === "footer" && {
  color: (theme.vars || theme).palette.text.secondary,
  lineHeight: theme.typography.pxToRem(21),
  fontSize: theme.typography.pxToRem(12)
}, ownerState.size === "small" && {
  padding: "6px 16px",
  [`&.${tableCellClasses_default.paddingCheckbox}`]: {
    width: 24,
    // prevent the checkbox column from growing
    padding: "0 12px 0 16px",
    "& > *": {
      padding: 0
    }
  }
}, ownerState.padding === "checkbox" && {
  width: 48,
  // prevent the checkbox column from growing
  padding: "0 0 0 4px"
}, ownerState.padding === "none" && {
  padding: 0
}, ownerState.align === "left" && {
  textAlign: "left"
}, ownerState.align === "center" && {
  textAlign: "center"
}, ownerState.align === "right" && {
  textAlign: "right",
  flexDirection: "row-reverse"
}, ownerState.align === "justify" && {
  textAlign: "justify"
}, ownerState.stickyHeader && {
  position: "sticky",
  top: 0,
  zIndex: 2,
  backgroundColor: (theme.vars || theme).palette.background.default
}));
var TableCell = React11.forwardRef(function TableCell2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTableCell"
  });
  const {
    align = "inherit",
    className,
    component: componentProp,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const table = React11.useContext(TableContext_default);
  const tablelvl2 = React11.useContext(Tablelvl2Context_default);
  const isHeadCell = tablelvl2 && tablelvl2.variant === "head";
  let component;
  if (componentProp) {
    component = componentProp;
  } else {
    component = isHeadCell ? "th" : "td";
  }
  let scope = scopeProp;
  if (component === "td") {
    scope = void 0;
  } else if (!scope && isHeadCell) {
    scope = "col";
  }
  const variant = variantProp || tablelvl2 && tablelvl2.variant;
  const ownerState = _extends({}, props, {
    align,
    component,
    padding: paddingProp || (table && table.padding ? table.padding : "normal"),
    size: sizeProp || (table && table.size ? table.size : "medium"),
    sortDirection,
    stickyHeader: variant === "head" && table && table.stickyHeader,
    variant
  });
  const classes = useUtilityClasses6(ownerState);
  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === "asc" ? "ascending" : "descending";
  }
  return (0, import_jsx_runtime13.jsx)(TableCellRoot, _extends({
    as: component,
    ref,
    className: clsx_default(classes.root, className),
    "aria-sort": ariaSort,
    scope,
    ownerState
  }, other));
});
true ? TableCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align: import_prop_types8.default.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: import_prop_types8.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types8.default.object,
  /**
   * @ignore
   */
  className: import_prop_types8.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types8.default.elementType,
  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding: import_prop_types8.default.oneOf(["checkbox", "none", "normal"]),
  /**
   * Set scope attribute.
   */
  scope: import_prop_types8.default.string,
  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["medium", "small"]), import_prop_types8.default.string]),
  /**
   * Set aria-sort direction.
   */
  sortDirection: import_prop_types8.default.oneOf(["asc", "desc", false]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object]),
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["body", "footer", "head"]), import_prop_types8.default.string])
} : void 0;
var TableCell_default = TableCell;

// node_modules/@mui/material/Toolbar/toolbarClasses.js
init_esm();
init_generateUtilityClass();
function getToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiToolbar", slot);
}
var toolbarClasses = generateUtilityClasses("MuiToolbar", ["root", "gutters", "regular", "dense"]);
var toolbarClasses_default = toolbarClasses;

// node_modules/@mui/material/Toolbar/Toolbar.js
init_objectWithoutPropertiesLoose();
init_extends();
var React12 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_useThemeProps();
init_styled();
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var _excluded7 = ["className", "component", "disableGutters", "variant"];
var useUtilityClasses7 = (ownerState) => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ["root", !disableGutters && "gutters", variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
var ToolbarRoot = styled_default("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "relative",
  display: "flex",
  alignItems: "center"
}, !ownerState.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, ownerState.variant === "dense" && {
  minHeight: 48
}), ({
  theme,
  ownerState
}) => ownerState.variant === "regular" && theme.mixins.toolbar);
var Toolbar = React12.forwardRef(function Toolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToolbar"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    variant = "regular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const ownerState = _extends({}, props, {
    component,
    disableGutters,
    variant
  });
  const classes = useUtilityClasses7(ownerState);
  return (0, import_jsx_runtime14.jsx)(ToolbarRoot, _extends({
    as: component,
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other));
});
true ? Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
   */
  children: import_prop_types9.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types9.default.object,
  /**
   * @ignore
   */
  className: import_prop_types9.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types9.default.elementType,
  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: import_prop_types9.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["dense", "regular"]), import_prop_types9.default.string])
} : void 0;
var Toolbar_default = Toolbar;

// node_modules/@mui/material/TablePagination/tablePaginationClasses.js
init_esm();
init_generateUtilityClass();
function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass("MuiTablePagination", slot);
}
var tablePaginationClasses = generateUtilityClasses("MuiTablePagination", ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);
var tablePaginationClasses_default = tablePaginationClasses;

// node_modules/@mui/material/TablePagination/TablePagination.js
init_objectWithoutPropertiesLoose();
init_extends();
var React14 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());
init_clsx();
init_esm();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/TablePagination/TablePaginationActions.js
init_extends();
init_objectWithoutPropertiesLoose();
var React13 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var _LastPageIcon;
var _FirstPageIcon;
var _KeyboardArrowRight;
var _KeyboardArrowLeft;
var _KeyboardArrowLeft2;
var _KeyboardArrowRight2;
var _FirstPageIcon2;
var _LastPageIcon2;
var _excluded8 = ["backIconButtonProps", "count", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton"];
var TablePaginationActions = React13.forwardRef(function TablePaginationActions2(props, ref) {
  const {
    backIconButtonProps,
    count,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const theme = useTheme();
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (0, import_jsx_runtime16.jsxs)("div", _extends({
    ref
  }, other, {
    children: [showFirstButton && (0, import_jsx_runtime15.jsx)(IconButton_default, {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel("first", page),
      title: getItemAriaLabel("first", page),
      children: theme.direction === "rtl" ? _LastPageIcon || (_LastPageIcon = (0, import_jsx_runtime15.jsx)(LastPage_default, {})) : _FirstPageIcon || (_FirstPageIcon = (0, import_jsx_runtime15.jsx)(FirstPage_default, {}))
    }), (0, import_jsx_runtime15.jsx)(IconButton_default, _extends({
      onClick: handleBackButtonClick,
      disabled: page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel("previous", page),
      title: getItemAriaLabel("previous", page)
    }, backIconButtonProps, {
      children: theme.direction === "rtl" ? _KeyboardArrowRight || (_KeyboardArrowRight = (0, import_jsx_runtime15.jsx)(KeyboardArrowRight_default, {})) : _KeyboardArrowLeft || (_KeyboardArrowLeft = (0, import_jsx_runtime15.jsx)(KeyboardArrowLeft_default, {}))
    })), (0, import_jsx_runtime15.jsx)(IconButton_default, _extends({
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      color: "inherit",
      "aria-label": getItemAriaLabel("next", page),
      title: getItemAriaLabel("next", page)
    }, nextIconButtonProps, {
      children: theme.direction === "rtl" ? _KeyboardArrowLeft2 || (_KeyboardArrowLeft2 = (0, import_jsx_runtime15.jsx)(KeyboardArrowLeft_default, {})) : _KeyboardArrowRight2 || (_KeyboardArrowRight2 = (0, import_jsx_runtime15.jsx)(KeyboardArrowRight_default, {}))
    })), showLastButton && (0, import_jsx_runtime15.jsx)(IconButton_default, {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel("last", page),
      title: getItemAriaLabel("last", page),
      children: theme.direction === "rtl" ? _FirstPageIcon2 || (_FirstPageIcon2 = (0, import_jsx_runtime15.jsx)(FirstPage_default, {})) : _LastPageIcon2 || (_LastPageIcon2 = (0, import_jsx_runtime15.jsx)(LastPage_default, {}))
    })]
  }));
});
true ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  backIconButtonProps: import_prop_types10.default.object,
  /**
   * The total number of rows.
   */
  count: import_prop_types10.default.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: import_prop_types10.default.func.isRequired,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  nextIconButtonProps: import_prop_types10.default.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: import_prop_types10.default.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: import_prop_types10.default.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: import_prop_types10.default.number.isRequired,
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: import_prop_types10.default.bool.isRequired,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: import_prop_types10.default.bool.isRequired
} : void 0;
var TablePaginationActions_default = TablePaginationActions;

// node_modules/@mui/material/TablePagination/TablePagination.js
init_useId();
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var _InputBase;
var _excluded9 = ["ActionsComponent", "backIconButtonProps", "className", "colSpan", "component", "count", "getItemAriaLabel", "labelDisplayedRows", "labelRowsPerPage", "nextIconButtonProps", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps", "showFirstButton", "showLastButton"];
var TablePaginationRoot = styled_default(TableCell_default, {
  name: "MuiTablePagination",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  overflow: "auto",
  color: (theme.vars || theme).palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  // Increase the specificity to override TableCell.
  "&:last-child": {
    padding: 0
  }
}));
var TablePaginationToolbar = styled_default(Toolbar_default, {
  name: "MuiTablePagination",
  slot: "Toolbar",
  overridesResolver: (props, styles) => _extends({
    [`& .${tablePaginationClasses_default.actions}`]: styles.actions
  }, styles.toolbar)
})(({
  theme
}) => ({
  minHeight: 52,
  paddingRight: 2,
  [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
    minHeight: 52
  },
  [theme.breakpoints.up("sm")]: {
    minHeight: 52,
    paddingRight: 2
  },
  [`& .${tablePaginationClasses_default.actions}`]: {
    flexShrink: 0,
    marginLeft: 20
  }
}));
var TablePaginationSpacer = styled_default("div", {
  name: "MuiTablePagination",
  slot: "Spacer",
  overridesResolver: (props, styles) => styles.spacer
})({
  flex: "1 1 100%"
});
var TablePaginationSelectLabel = styled_default("p", {
  name: "MuiTablePagination",
  slot: "SelectLabel",
  overridesResolver: (props, styles) => styles.selectLabel
})(({
  theme
}) => _extends({}, theme.typography.body2, {
  flexShrink: 0
}));
var TablePaginationSelect = styled_default(Select_default, {
  name: "MuiTablePagination",
  slot: "Select",
  overridesResolver: (props, styles) => _extends({
    [`& .${tablePaginationClasses_default.selectIcon}`]: styles.selectIcon,
    [`& .${tablePaginationClasses_default.select}`]: styles.select
  }, styles.input, styles.selectRoot)
})({
  color: "inherit",
  fontSize: "inherit",
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8,
  [`& .${tablePaginationClasses_default.select}`]: {
    paddingLeft: 8,
    paddingRight: 24,
    textAlign: "right",
    textAlignLast: "right"
    // Align <select> on Chrome.
  }
});
var TablePaginationMenuItem = styled_default(MenuItem_default, {
  name: "MuiTablePagination",
  slot: "MenuItem",
  overridesResolver: (props, styles) => styles.menuItem
})({});
var TablePaginationDisplayedRows = styled_default("p", {
  name: "MuiTablePagination",
  slot: "DisplayedRows",
  overridesResolver: (props, styles) => styles.displayedRows
})(({
  theme
}) => _extends({}, theme.typography.body2, {
  flexShrink: 0
}));
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
var useUtilityClasses8 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    toolbar: ["toolbar"],
    spacer: ["spacer"],
    selectLabel: ["selectLabel"],
    select: ["select"],
    input: ["input"],
    selectIcon: ["selectIcon"],
    menuItem: ["menuItem"],
    displayedRows: ["displayedRows"],
    actions: ["actions"]
  };
  return composeClasses(slots, getTablePaginationUtilityClass, classes);
};
var TablePagination = React14.forwardRef(function TablePagination2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTablePagination"
  });
  const {
    ActionsComponent = TablePaginationActions_default,
    backIconButtonProps,
    className,
    colSpan: colSpanProp,
    component = TableCell_default,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = "Rows per page:",
    nextIconButtonProps,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const ownerState = props;
  const classes = useUtilityClasses8(ownerState);
  const MenuItemComponent = SelectProps.native ? "option" : TablePaginationMenuItem;
  let colSpan;
  if (component === TableCell_default || component === "td") {
    colSpan = colSpanProp || 1e3;
  }
  const selectId = useId_default(SelectProps.id);
  const labelId = useId_default(SelectProps.labelId);
  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  return (0, import_jsx_runtime17.jsx)(TablePaginationRoot, _extends({
    colSpan,
    ref,
    as: component,
    ownerState,
    className: clsx_default(classes.root, className)
  }, other, {
    children: (0, import_jsx_runtime18.jsxs)(TablePaginationToolbar, {
      className: classes.toolbar,
      children: [(0, import_jsx_runtime17.jsx)(TablePaginationSpacer, {
        className: classes.spacer
      }), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime17.jsx)(TablePaginationSelectLabel, {
        className: classes.selectLabel,
        id: labelId,
        children: labelRowsPerPage
      }), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime17.jsx)(TablePaginationSelect, _extends({
        variant: "standard"
      }, !SelectProps.variant && {
        input: _InputBase || (_InputBase = (0, import_jsx_runtime17.jsx)(InputBase_default, {}))
      }, {
        value: rowsPerPage,
        onChange: onRowsPerPageChange,
        id: selectId,
        labelId
      }, SelectProps, {
        classes: _extends({}, SelectProps.classes, {
          // TODO v5 remove `classes.input`
          root: clsx_default(classes.input, classes.selectRoot, (SelectProps.classes || {}).root),
          select: clsx_default(classes.select, (SelectProps.classes || {}).select),
          // TODO v5 remove `selectIcon`
          icon: clsx_default(classes.selectIcon, (SelectProps.classes || {}).icon)
        }),
        children: rowsPerPageOptions.map((rowsPerPageOption) => (0, import_react.createElement)(MenuItemComponent, _extends({}, !isHostComponent(MenuItemComponent) && {
          ownerState
        }, {
          className: classes.menuItem,
          key: rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
          value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
        }), rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
      })), (0, import_jsx_runtime17.jsx)(TablePaginationDisplayedRows, {
        className: classes.displayedRows,
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page
        })
      }), (0, import_jsx_runtime17.jsx)(ActionsComponent, {
        className: classes.actions,
        backIconButtonProps,
        count,
        nextIconButtonProps,
        onPageChange,
        page,
        rowsPerPage,
        showFirstButton,
        showLastButton,
        getItemAriaLabel
      })]
    })
  }));
});
true ? TablePagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: import_prop_types11.default.elementType,
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) component.
   */
  backIconButtonProps: import_prop_types11.default.object,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types11.default.object,
  /**
   * @ignore
   */
  className: import_prop_types11.default.string,
  /**
   * @ignore
   */
  colSpan: import_prop_types11.default.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types11.default.elementType,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: integerPropType_default.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: import_prop_types11.default.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: import_prop_types11.default.func,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: import_prop_types11.default.node,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  nextIconButtonProps: import_prop_types11.default.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: import_prop_types11.default.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: import_prop_types11.default.func,
  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType_default.isRequired, (props) => {
    const {
      count,
      page,
      rowsPerPage
    } = props;
    if (count === -1) {
      return null;
    }
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error(`MUI: The page prop of a TablePagination is out of range (0 to ${newLastPage}, but page is ${page}).`);
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType_default.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.number, import_prop_types11.default.shape({
    label: import_prop_types11.default.string.isRequired,
    value: import_prop_types11.default.number.isRequired
  })]).isRequired),
  /**
   * Props applied to the rows per page [`Select`](/material-ui/api/select/) element.
   * @default {}
   */
  SelectProps: import_prop_types11.default.object,
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: import_prop_types11.default.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: import_prop_types11.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object])
} : void 0;
var TablePagination_default = TablePagination;

export {
  getBadgeUtilityClass,
  badgeClasses_default,
  Badge_default,
  Box_default,
  SwitchBase_default,
  getCheckboxUtilityClass,
  checkboxClasses_default,
  Checkbox_default,
  Stack_default,
  stackClasses_default,
  getFormControlLabelUtilityClasses,
  formControlLabelClasses_default,
  FormControlLabel_default,
  getSwitchUtilityClass,
  switchClasses_default,
  Switch_default,
  TableContext_default,
  Tablelvl2Context_default,
  getTableCellUtilityClass,
  tableCellClasses_default,
  TableCell_default,
  getToolbarUtilityClass,
  toolbarClasses_default,
  Toolbar_default,
  getTablePaginationUtilityClass,
  tablePaginationClasses_default,
  TablePagination_default
};
//# sourceMappingURL=chunk-LNGKOXJQ.js.map
