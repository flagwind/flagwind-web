const generic = `
<template>
    <fw-number-counter :value="value1"></fw-number-counter>
    <br />
    <i-button type="success" @click="value1 += 10">增加</i-button>
    <i-button type="error" @click="value1 -= 10">减少</i-button>
</template>
<script>
    export default {
        data() {
            return {
                value1: 1860
            }
        }
    }
</script>
`;

const format = `
<template>
    <fw-number-counter :value="value2" format="(,ddd).dd"></fw-number-counter>
    <br />
    <i-button type="info" @click="value2 += 100">增加</i-button>
    <i-button type="warning" @click="value2 -= 100">减少</i-button>
</template>
<script>
    export default {
        data() {
            return {
                value2: 12345.67
            }
        }
    }
</script>
`;

const animation = `
<template>
    <fw-number-counter :value="value3" animation="count"></fw-number-counter>
    <br />
    <i-button type="success" @click="value3 = 123456">加值</i-button>
    <i-button type="error" @click="value3 = 0">减值</i-button>
</template>
<script>
    export default {
        data() {
            return {
                value3: 1000
            }
        }
    }
</script>
`;

export { generic, format, animation };
