const generic = `
<template>
    <i-form :model="productModel" :label-width="80">
        <i-form-item label="名称" prop="name">
            <fw-edit-field :on-change="onValueChange">
                <i-input v-model="productModel.name" :autofocus="true" style="width:200px;" />
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="分类" prop="category">
            <fw-edit-field :on-change="onValueChange">
                <i-select v-model="productModel.category" style="width:200px" multiple>
                    <i-option v-for="item in categories" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                </i-select>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="重量" prop="weight">
            <fw-edit-field :on-change="onValueChange">
                <i-input-number v-model="productModel.weight" />
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="原产地" prop="placeOfProduction">
            <fw-edit-field :on-change="onValueChange">
                <i-cascader v-model="productModel.placeOfProduction" style="width:200px" :data="cities"></i-cascader>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="生产日期" prop="productionDate">
            <fw-edit-field :on-change="onValueChange">
                <i-date-picker v-model="productModel.productionDate" style="width:200px" type="date" show-week-numbers></i-date-picker>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="生产时间" prop="productionTime">
            <fw-edit-field :on-change="onValueChange">
                <i-time-picker v-model="productModel.productionTime" style="width:200px" type="time"></i-time-picker>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="产品描述" prop="description">
            <fw-edit-field :on-change="onValueChange">
                <i-input v-model="productModel.description" style="width:350px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="发布平台" prop="publishPlatform">
            <fw-edit-field :on-change="onValueChange">
                <i-radio-group v-model="productModel.publishPlatform">
                    <i-radio v-for="item in publishPlatforms" :key="item.value" :label="item.value">
                        <span>{{item.label}}</span>
                    </i-radio>
                </i-radio-group>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="共享平台" prop="sharePlatform">
            <fw-edit-field :on-change="onValueChange">
                <i-checkbox-group v-model="productModel.sharePlatform">
                    <i-checkbox v-for="item in sharePlatforms" :key="item.value" :label="item.value">
                        <i-icon :type="item.icon"></i-icon>
                        <span>{{item.label}}</span>
                    </i-checkbox>
                </i-checkbox-group>
            </fw-edit-field>
        </i-form-item>

        <i-form-item label="是否下架" prop="disabled">
            <fw-edit-field :on-change="onValueChange">
                <i-switch v-model="productModel.disabled">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </fw-edit-field>
        </i-form-item>
    </i-form>
</template>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 编辑域组件示例视图。
 * @class
 * @version 1.0.0
 */
@component
export default class EditFieldView extends View
{
    /**
     * 产品模型。
     * @protected
     * @member
     * @returns any
     */
    protected productModel: any =
    {
        // 商品名称
        name: "新奇士脐橙",

        // 分类
        category: [1],
        
        // 重量
        weight: 1.5,

        // 产地
        placeOfProduction: ["jiangsu", "suzhou", "zhuozhengyuan"],

        // 生产日期
        productionDate: "2018-05-01",

        // 生产时间
        productionTime: "08:30:05",
        
        // 描述
        description: "我是一个多行显示的文本我可以支持换成处理的哦",

        // 发布平台
        publishPlatform: "jd",
        
        // 共享平台
        sharePlatform: ["github", "facebook"],

        // 是否下架
        disabled: true
    };

    /**
     * 产品分类列表。
     * @protected
     * @member
     * @returns Array
     */
    protected categories: Array<object> =
    [
        {
            label: "蔬菜",
            value: 0
        },
        {
            label: "水果",
            value: 1
        },
        {
            label: "海鲜水产",
            value: 2
        },
        {
            label: "乳品冷饮",
            value: 3
        }
    ];

    /**
     * 产地城市列表。
     * @protected
     * @member
     * @returns Array
     */
    protected cities: Array<object> =
    [
        {
            value: "beijing",
            label: "北京",
            children:
            [
                {
                    value: "gugong",
                    label: "故宫"
                },
                {
                    value: "tiantan",
                    label: "天坛"
                },
                {
                    value: "wangfujing",
                    label: "王府井"
                }
            ]
        },
        {
            value: "jiangsu",
            label: "江苏",
            children:
            [
                {
                    value: "nanjing",
                    label: "南京",
                    children:
                    [
                        {
                            value: "fuzimiao",
                            label: "夫子庙"
                        }
                    ]
                },
                {
                    value: "suzhou",
                    label: "苏州",
                    children:
                    [
                        {
                            value: "zhuozhengyuan",
                            label: "拙政园"
                        },
                        {
                            value: "shizilin",
                            label: "狮子林"
                        }
                    ]
                }
            ]
        }
    ];

    /**
     * 发布平台列表。
     * @protected
     * @member
     * @returns Array
     */
    protected publishPlatforms: Array<object> =
    [
        {
            label: "天猫超市",
            value: "tmall"
        },
        {
            label: "京东自营",
            value: "jd"
        },
        {
            label: "苏宁易购",
            value: "suning"
        }
    ];

    /**
     * 共享平台列表。
     * @protected
     * @member
     * @returns Array
     */
    protected sharePlatforms: Array<object> =
    [
        {
            label: "Twitter",
            value: "twitter",
            icon: "social-twitter"
        },
        {
            label: "Facebook",
            value: "facebook",
            icon: "social-facebook"
        },
        {
            label: "Github",
            value: "github",
            icon: "social-github"
        },
        {
            label: "Snapchat",
            value: "snapchat",
            icon: "social-snapchat"
        }
    ];

    /**
     * 共享平台列表。
     * @protected
     * @async
     * @param  {any} value 变动后的的值。
     * @param  {any} originalValue 变动前的的值。
     * @returns Promise
     */
    protected async onValueChange(value: any, originalValue: any): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            setTimeout(() =>
            {
                console.log("当前值：", value);
                console.log("改变前的值：", originalValue);
                console.log("======================");

                resolve();

            }, 500);
        });
    }
}
</script>
`;

export { generic };
