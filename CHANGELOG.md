# Changelog

## 3.8.0-canary.21

### Patch Changes

- [`ff3c392`](https://github.com/reshaped-ui/reshaped/commit/ff3c3925c1b0e78cf830d3f9a3657a5e57e6e995) Thanks [@blvdmitry](https://github.com/blvdmitry)! - updated release process

## 3.8.0-canary.20

### Patch Changes

- [`1dcbf57`](https://github.com/reshaped-ui/reshaped/commit/1dcbf576e0d657de92bd206321e84f48e4d6c720) Thanks [@blvdmitry](https://github.com/blvdmitry)! - updated github releases notes

## 3.8.0-canary.19

### Patch Changes

- [`d4a95e8`](https://github.com/reshaped-ui/reshaped/commit/d4a95e8e966982c71d65b3a9fe2e7fb54c735ee7) Thanks [@blvdmitry](https://github.com/blvdmitry)! - test

## 3.8.0-canary.17

### Patch Changes

- edab409: updated changelog version title
- fc82110: Added a comment to Aligner

## 3.8.0-canary.16

### Patch Changes

- 0d6e04c: updated changelog version order

## 3.8.0-canary.15

### Patch Changes

- aa75e22: github releases

## 3.8.0-canary.14

### Patch Changes

- 8fb8f3e: switched changelog generation to use changesets cli

## 3.8.0-canary.13

### Features

- **ToggleButton,ToggleButtonGroup:** added selectedColor ([#466](https://github.com/reshaped-ui/reshaped/issues/466)) ([e5987e4](https://github.com/reshaped-ui/reshaped/commit/e5987e454dc8cb2b93c45089b68c07a82ed6ac93))
- **useKeyboardArrowNavigation:** added new hook ([#465](https://github.com/reshaped-ui/reshaped/issues/465)) ([104947f](https://github.com/reshaped-ui/reshaped/commit/104947f4bd000b1c62964b1b5ebad764e9bc4c7c))

## 3.8.0-canary.12

### Bug Fixes

- **Text:** fixed text css reset ([f6526ef](https://github.com/reshaped-ui/reshaped/commit/f6526ef1865280c93688deacbb2b50f7ecf8b459))

### Features

- **TextField:** startSlotPadding and endSlotPadding support ([#464](https://github.com/reshaped-ui/reshaped/issues/464)) ([2f33180](https://github.com/reshaped-ui/reshaped/commit/2f33180630773ebd119fa65575b2ff6c437d7970))

## 3.8.0-canary.11

### Bug Fixes

- **useOnClickOutside:** removed pointerType check blocking ios17 execution ([2f4ec1d](https://github.com/reshaped-ui/reshaped/commit/2f4ec1d8e3aa53fb7107050950c6895559c41e1e))
- **useScrollLock:** fixed reset conflict when using container on ios ([#459](https://github.com/reshaped-ui/reshaped/issues/459)) ([d13c364](https://github.com/reshaped-ui/reshaped/commit/d13c364ee719e6a8b78d4f38167d802220b3e9a6))

### Features

- **Flyout:** exposed TriggerAttributes types ([#458](https://github.com/reshaped-ui/reshaped/issues/458)) ([b5230ed](https://github.com/reshaped-ui/reshaped/commit/b5230edecc7aac21a8a866b7f7101e1f87f4a213))
- **Text:** added low priority css reset for global styles ([#460](https://github.com/reshaped-ui/reshaped/issues/460)) ([04090ec](https://github.com/reshaped-ui/reshaped/commit/04090ec23285e05975a24e0f2e6789d25aa96de1))

## 3.8.0-canary.10

### Bug Fixes

- **useScrollLock:** fixed reset conflict when using container on ios ([#459](https://github.com/reshaped-ui/reshaped/issues/459)) ([d13c364](https://github.com/reshaped-ui/reshaped/commit/d13c364ee719e6a8b78d4f38167d802220b3e9a6))

### Features

- **Flyout:** exposed TriggerAttributes types ([#458](https://github.com/reshaped-ui/reshaped/issues/458)) ([b5230ed](https://github.com/reshaped-ui/reshaped/commit/b5230edecc7aac21a8a866b7f7101e1f87f4a213))

## 3.8.0-canary.9

### Bug Fixes

- updated selector for variable based css utilities ([54174aa](https://github.com/reshaped-ui/reshaped/commit/54174aa522fb0a208f5df60add7c8681274bba18))

## 3.8.0-canary.8

### Bug Fixes

- **Modal, Select, TextField, TextArea:** fixed mobile scrolling and border dimensions ([#457](https://github.com/reshaped-ui/reshaped/issues/457)) ([9b422c9](https://github.com/reshaped-ui/reshaped/commit/9b422c98b6ccaeb5687c7dc961540c459a1b5fab))

### Features

- **Select:** added multiple support ([#453](https://github.com/reshaped-ui/reshaped/issues/453)) ([01eea4a](https://github.com/reshaped-ui/reshaped/commit/01eea4a6b72fc8269f9e7af034a44842267f8119))

## 3.8.0-canary.7

### Bug Fixes

- added child id to all components used in React.Children.map ([179bc06](https://github.com/reshaped-ui/reshaped/commit/179bc06b0c016753de0a92221b711d604101140f))

### Features

- **DropdownMenu:** pass through more menu props to submenu ([9a46c7e](https://github.com/reshaped-ui/reshaped/commit/9a46c7e3a260c560aec795afa73a87b31fc1dd29))
- **Select:** added custom select support ([d9fa60f](https://github.com/reshaped-ui/reshaped/commit/d9fa60f810abefe18735d23346cb22ba0353e57b))
- **Select:** added keyboard selection ([3734ba0](https://github.com/reshaped-ui/reshaped/commit/3734ba0b0bb59096b70c63b2ecf16f9ece498f2d))
- **Stepper:** make gap property configurable ([6a391e4](https://github.com/reshaped-ui/reshaped/commit/6a391e464db6f78e82a08da2afcbd854baf9aefa))

## 3.8.0-canary.6

### Features

- **Flyout, Popover, DropdownMenu, Autocomplete:** added size calculations for fallbackAdjustLayout, added fallbackMinWidth and fallbackMinHeight ([16cbbd0](https://github.com/reshaped-ui/reshaped/commit/16cbbd0a2ee4c081ac836fec821d686af0305a2f))
- **Flyout, Popover, DropdownMenu, Autocomplete:** added size for fallbackAdjustLayout, fallbackMinWidth and fallbackMinHeight ([a3ef7d0](https://github.com/reshaped-ui/reshaped/commit/a3ef7d0c2b5a258f53c28d764b471db91a5288b6))
- **Icon:** blank icon support ([40dec33](https://github.com/reshaped-ui/reshaped/commit/40dec336607cae9b6ec3d1acad0458e37f552807))

## 3.8.0-canary.5

### Bug Fixes

- **Modal:** additional fix for the nested closing modals ([9da48ba](https://github.com/reshaped-ui/reshaped/commit/9da48ba42c41af914af9da6748997b7c229f8083))

## 3.8.0-canary.4

### Bug Fixes

- **Modal:** fixed nested modals not closing one by one ([e8af4ed](https://github.com/reshaped-ui/reshaped/commit/e8af4ed80b8eabd1b7e5466fd0be6adb90a9d70f))

## 3.8.0-canary.3

### Features

- **Actionable, Link, Button, MenuItem:** added render prop ([104e594](https://github.com/reshaped-ui/reshaped/commit/104e594dcb086fd9f6a38c8085ebceda8a2ec9cf))

## 3.8.0-canary.2

### Features

- **ToggleButton:** relaxed variant types ([416ddaa](https://github.com/reshaped-ui/reshaped/commit/416ddaa3ebbeed9e12acfdc7e0fb3027943dfbbf))

## 3.8.0-canary.1

### Bug Fixes

- **Flyout:** fixed fallbackAdjustLayout positioning ([eaa9739](https://github.com/reshaped-ui/reshaped/commit/eaa9739bd340a60e942e3689fef46fa3ccd94f31))
- **PinField:** fixed incorrect overwrite behavior edge case when default value is provided ([8a3d269](https://github.com/reshaped-ui/reshaped/commit/8a3d269fbffad5530669445f2f0c9e107ac93eb0))

### Features

- **flyout:** add shiftIntoView fallback for constrained containers ([7547e9a](https://github.com/reshaped-ui/reshaped/commit/7547e9ad7bd445a49463b60f87d87fcd8eed430b)), closes [#423](https://github.com/reshaped-ui/reshaped/issues/423)
- **Flyout:** added fallbackAdjustLayout ([88255e4](https://github.com/reshaped-ui/reshaped/commit/88255e47b71e9166db31a5f54239be2ea59c2fb0))

## 3.8.0-canary.0

### Bug Fixes

- **Flyout:** added support for attributes.style ([24a414f](https://github.com/formaat-design/reshaped-source/commit/24a414fa050bd3f6f91d0d0dae37030dd1677aba))
- **Theme:** added additional check when used without name and there is no parent theme ([3cca4d1](https://github.com/formaat-design/reshaped-source/commit/3cca4d1ea0bb1a33f706bdc74f28f8f955a6a841))

### Features

- **Grid:** added columnGap and rowGap properties ([3aaaea6](https://github.com/formaat-design/reshaped-source/commit/3aaaea66e497636638397b2672e57e5d0a8be9ee))
- **ProgressIndicator:** updated the dots design and simplified the implementation ([e881361](https://github.com/formaat-design/reshaped-source/commit/e881361880b8d6381f56431078b253a78cec293b))
- remove chromatic token ([18685a7](https://github.com/formaat-design/reshaped-source/commit/18685a7b100c85094cc64d34a47f605bbb41c580))
- **Tabs:** removed hover effect from the active tabs ([5708280](https://github.com/formaat-design/reshaped-source/commit/5708280515f164b1b21c8ab5ea84eaadaa7f5379))
- **themes:** added transform helper to the exports ([ca8dd87](https://github.com/formaat-design/reshaped-source/commit/ca8dd870974920da01b93dfcff16e918080b0125))

## 3.7.4

### Bug Fixes

- **Autocomplete:** correct backspace handling ([c6eb011](https://github.com/formaat-design/reshaped-source/commit/c6eb011f4c8a64aca15997d9194d0b1d12ad2709))

## 3.7.3

### Bug Fixes

- **Tabs:** item equal scroll ([d1ce792](https://github.com/formaat-design/reshaped-source/commit/d1ce792de460092a9381fa61276db30209faf324))

## 3.7.2

### Bug Fixes

- padding fallbacks ([250fa5b](https://github.com/formaat-design/reshaped-source/commit/250fa5be907c81699ff8a9c2e9646c70194183b6))

## 3.8.0

- Added tsdoc for all components

- DropdownMenu: Added support for attributes.style on the content
