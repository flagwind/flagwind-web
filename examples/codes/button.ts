/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

const type = `
<template>
    <i-button>Default</i-button>
    <i-button type="primary">Primary</i-button>
    <i-button type="ghost">Ghost</i-button>
    <i-button type="dashed">Dashed</i-button>
    <i-button type="text">Text</i-button>
    <br><br>
    <i-button type="info">Info</i-button>
    <i-button type="success">Success</i-button>
    <i-button type="warning">Warning</i-button>
    <i-button type="error">Error</i-button>
</template>
`;

const icon = `
<template>
    <i-button type="primary" shape="circle" icon="ios-search"></i-button>
    <i-button type="primary" icon="ios-search">Search</i-button>
    <i-button type="primary" shape="circle" icon="ios-search">Search</i-button>
    <i-button type="primary" shape="circle">Circle</i-button>
    <br><br>
    <i-button type="ghost" shape="circle" icon="ios-search"></i-button>
    <i-button type="ghost" icon="ios-search">Search</i-button>
    <i-button type="ghost" shape="circle" icon="ios-search">Search</i-button>
    <i-button type="ghost" shape="circle">Circle</i-button>
</template>
`;

const size = `
<template>
    <i-button type="primary" size="large">Large</i-button>
    <i-button type="primary">Default</i-button>
    <i-button type="primary" size="small">Small</i-button>
    <br><br>
    <i-button type="primary" shape="circle" size="large">Large</i-button>
    <i-button type="primary" shape="circle">Default</i-button>
    <i-button type="primary" shape="circle" size="small">Small</i-button>
</template>
`;

const long = `
<template>
    <i-button type="success" long>SUBMIT</i-button>
    <br><br>
    <i-button type="error" long>DELETE</i-button>
</template>
`;

export { type, icon, size, long };
