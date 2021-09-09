/* eslint-disable no-empty-pattern */
const Product = require('./models/product')

const resolvers = {
    Query: {
        hello: () => 'Hello from GraphQL',
        // products
        getProducts: async () => {
            try {
                return await Product.find({})
            } catch (err) {
                console.log(err)
            }
        },
        getProduct: async (_, {id}) => {
            const product = await Product.findById(id)

            if (!product) {
                throw new Error('Product not found')
            }

            return product
        },
    },

    Mutation: {
        // products
        newProduct: async (_, {input}) => {
            try {
                const product = new Product(input)

                return await product.save()
            } catch (err) {
                console.log(err)
            }
        },
        updateProduct: async (_, {id, input}) => {
            let product = await Product.findById(id)

            if (!product) {
                throw new Error('Product not found')
            }

            product = await Product.findOneAndUpdate({_id: id}, input, {
                new: true,
            })

            return product
        },
        deleteProduct: async (_, {id}) => {
            const product = await Product.findById(id)

            if (!product) {
                throw new Error('Producto no encontrado')
            }

            await Product.findOneAndDelete({_id: id})

            return 'Producto eliminado'
        },
    },
}

module.exports = resolvers
