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
    <br/><br/>
    <i-button type="info">Info</i-button>
    <i-button type="success">Success</i-button>
    <i-button type="warning">Warning</i-button>
    <i-button type="error">Error</i-button>
</template>
<script>
export default {
    
}
</script>
`;

const icon = `
<template>
    <i-button type="primary" shape="circle" icon="ios-search"></i-button>
    <i-button type="primary" icon="ios-search">Search</i-button>
    <i-button type="primary" shape="circle" icon="ios-search">Search</i-button>
    <i-button type="primary" shape="circle">Circle</i-button>
    <br/><br/>
    <i-button type="ghost" shape="circle" icon="ios-search"></i-button>
    <i-button type="ghost" icon="ios-search">Search</i-button>
    <i-button type="ghost" shape="circle" icon="ios-search">Search</i-button>
    <i-button type="ghost" shape="circle">Circle</i-button>
</template>
<script>
export default {
    
}
</script>
`;

const size = `
<template>
    <i-button type="primary" size="large">Large</i-button>
    <i-button type="primary">Default</i-button>
    <i-button type="primary" size="small">Small</i-button>
    <br/><br/>
    <i-button type="primary" shape="circle" size="large">Large</i-button>
    <i-button type="primary" shape="circle">Default</i-button>
    <i-button type="primary" shape="circle" size="small">Small</i-button>
</template>
<script>
export default {
    
}
</script>
`;

const long = `
<template>
    <i-button type="success" long>SUBMIT</i-button>
    <br/><br/>
    <i-button type="error" long>DELETE</i-button>
</template>
<script>
export default {
    
}
</script>
`;

const disabled = `
<template>
    <i-button>Default</i-button>
    <i-button disabled>Default(Disabled)</i-button>
    <br/>
    <i-button type="primary">Primary</i-button>
    <i-button type="primary" disabled>Primary(Disabled)</i-button>
    <br/>
    <i-button type="ghost">Ghost</i-button>
    <i-button type="ghost" disabled>Ghost(Disabled)</i-button>
    <br/>
    <i-button type="dashed">Dashed</i-button>
    <i-button type="dashed" disabled>Dashed(Disabled)</i-button>
    <br/>
    <i-button type="text">Text</i-button>
    <i-button type="text" disabled>Text(Disabled)</i-button>
</template>
<script>
    export default {
        
    }
</script>
`;

const loading = `
<template>
    <i-button type="primary" loading>Loading...</i-button>
    <i-button type="primary" :loading="loading" @click="toLoading">
        <span v-if="!loading">Click me!</span>
        <span v-else>Loading...</span>
    </i-button>
    <i-button type="primary" :loading="loading2" icon="checkmark-round" @click="toLoading2">
        <span v-if="!loading2">Click me!</span>
        <span v-else>Loading...</span>
    </i-button>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                loading2: false
            }
        },
        methods: {
            toLoading () {
                this.loading = true;
            },
            toLoading2 () {
                this.loading2 = true;
            }
        }
    }
</script>
`;

const group = `
<template>
    <h4>Basic</h4>
    <br/><br/>
    <i-button-group>
        <i-button>Cancel</i-button>
        <i-button type="primary">Confirm</i-button>
    </i-button-group>
    <i-button-group>
        <i-button disabled>Yesterday</i-button>
        <i-button disabled>Today</i-button>
        <i-button disabled>Tomorrow</i-button>
    </i-button-group>
    <i-button-group>
        <i-button type="primary">L</i-button>
        <i-button>M</i-button>
        <i-button type="ghost">M</i-button>
        <i-button type="dashed">R</i-button>
    </i-button-group>
    <br/><br/>
    <h4>Icons</h4>
    <br/><br/>
    <i-button-group>
        <i-button type="primary">
            <Icon type="chevron-left"></Icon>
            Backward
        </i-button>
        <i-button type="primary">
            Forward
            <Icon type="chevron-right"></Icon>
        </i-button>
    </i-button-group>
    <i-button-group>
        <i-button type="primary" icon="ios-skipbackward"></i-button>
        <i-button type="primary" icon="ios-skipforward"></i-button>
    </i-button-group>
    <i-button-group>
        <i-button type="ghost" icon="ios-color-wand-outline"></i-button>
        <i-button type="ghost" icon="ios-sunny-outline"></i-button>
        <i-button type="ghost" icon="ios-crop"></i-button>
        <i-button type="ghost" icon="ios-color-filter-outline"></i-button>
    </i-button-group>
    <br/><br/>
    <h4>Circle</h4>
    <br/><br/>
    <i-button-group shape="circle">
        <i-button type="primary">
            <Icon type="chevron-left"></Icon>
            Backward
        </i-button>
        <i-button type="primary">
            Forward
            <Icon type="chevron-right"></Icon>
        </i-button>
    </i-button-group>
    <i-button-group shape="circle">
        <i-button type="primary" icon="ios-skipbackward"></i-button>
        <i-button type="primary" icon="ios-skipforward"></i-button>
    </i-button-group>
    <i-button-group shape="circle">
        <i-button type="ghost" icon="ios-color-wand-outline"></i-button>
        <i-button type="ghost" icon="ios-sunny-outline"></i-button>
        <i-button type="ghost" icon="ios-crop"></i-button>
        <i-button type="ghost" icon="ios-color-filter-outline"></i-button>
    </i-button-group>
    <br/><br/>
    <h4>Size</h4>
    <br/><br/>
    <i-button-group size="large">
        <i-button type="ghost">Large</i-button>
        <i-button type="ghost">Large</i-button>
    </i-button-group>
    <i-button-group>
        <i-button type="ghost">Default</i-button>
        <i-button type="ghost">Default</i-button>
    </i-button-group>
    <i-button-group size="small">
        <i-button type="ghost">Small</i-button>
        <i-button type="ghost">Small</i-button>
    </i-button-group>
    <br/><br/>
    <i-button-group size="large" shape="circle">
        <i-button type="ghost">Large</i-button>
        <i-button type="ghost">Large</i-button>
    </i-button-group>
    <i-button-group shape="circle">
        <i-button type="ghost">Default</i-button>
        <i-button type="ghost">Default</i-button>
    </i-button-group>
    <i-button-group size="small" shape="circle">
        <i-button type="ghost">Small</i-button>
        <i-button type="ghost">Small</i-button>
    </i-button-group>
</template>
<script>
    export default {
        
    }
</script>
`;

const vertical = `
<template>
    <i-button-group vertical>
        <i-button type="ghost" icon="social-facebook"></i-button>
        <i-button type="ghost" icon="social-twitter"></i-button>
        <i-button type="ghost" icon="social-googleplus"></i-button>
        <i-button type="ghost" icon="social-tumblr"></i-button>
    </i-button-group>
</template>
<script>
    export default {
        
    }
</script>
`;

export { type, icon, size, long, disabled, loading, group, vertical };
