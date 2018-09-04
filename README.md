# Project Title

Material Design Icons, svg version, bundled and ready for web.

## Getting Started

The [Material Design icon](https://material.io/tools/icons/?style=baseline) from Google, font version, is not updated with all icons ([see this bug](https://github.com/google/material-design-icons/issues/786)).

Since webfonts are no longer the best solution for icons I created a bundle with all SVG for an easy web usage.

### Using icons on page

You can use the CVS bundle as suggested in this [Medium article](https://medium.com/@webprolific/why-and-how-i-m-using-svg-over-fonts-for-icons-7241dab890f0).

Copy svg files from dist folder where you prefer.

First declare a general style for icons

```
.mdi {
  background-color: transparent;
  fill: currentColor;
  width: 24px;
  height: 24px;
}
```

Then inser the icon in your page (replace **menu** with your desired icon)

```
<svg class='mdi' role="img" title="menu">
    <use xlink:href="mdi.svg#menu"></use>
</svg>
```
### Using as CSS background
To use icon ass css background add '-view' to fragment

Example:
```
.breadcrumb-item + .breadcrumb-item::before {
    content: '';
    display: inline-block;
    fill: currentColor;
    color: #000;
    width: 24px;
    height: 24px;
    background: url('mdi.svg#chevron_right-view') no-repeat;
}
```

### Partial bundle

SVG file mdi.svg contains all icons. If your page use only icons from a determinate categories is more efficient to use the specific bundle:

Es: use *maps.svg* for icon *directions_bike*
```
<svg class='material-design-icons' role="img" title="directions_bike">
    <use xlink:href="maps.svg#directions_bike"></use>
</svg>
```

# Build yourself

Quite easy.

Clone repository, and download deps.

```
yarn install
```

Build it.

```
yarn build
```

# Contributor
Fabiano Taioli < ftaioli@vista.it >

# Licence
Apache License Version 2.0
