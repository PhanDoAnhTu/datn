const { model, Schema } = require('mongoose')
const slugify = require('slugify')
const DOCUMENT_NAME = 'spu'
const COLLECTION_NAME = 'spus'

const spuSchema = new Schema({
    // product_id: { type: String, default: '' },
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_brand: { type: String, default: "noBrand" },
    product_category: { type: Array, default: [] },
    product_unit: { type: String, default: null },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    /*{ttribute
        a_id: 12345,
        attribute_value:[
            {
                value_id: 456
            }
        ]
    }
    */
    product_variations: { type: Array, default: [] },
    /*
    tier_variation:[
        {
            images:[],
            name:`color`,
            options:[`hoong `, `xanh`]
        },
        {
            name:'size',
            options:[`S`,`M`]
            images:[]
        }
    ]
    */
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted: { type: Boolean, default: false }
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })

spuSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next();
})
spuSchema.index({ product_name: 'text' });

module.exports = model(DOCUMENT_NAME, spuSchema)

