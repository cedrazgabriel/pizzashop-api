import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { ordersItems, restaurants, users } from '.'
import { relations } from 'drizzle-orm'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
])

export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'set null',
    }),
  restaurantId: text('restaurant_id').references(() => restaurants.id, {
    onDelete: 'cascade',
  }),
  totalInCents: integer('total_in_cents').notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const orderRelations = relations(orders, ({ one, many }) => {
  return {
    customer: one(users, {
      fields: [orders.customerId],
      references: [users.id],
      relationName: 'order_customer',
    }),
    restaurant: one(restaurants, {
      fields: [orders.restaurantId],
      references: [restaurants.id],
      relationName: 'order_restaurant',
    }),
    orderItems: many(ordersItems),
  }
})