import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { restaurants, users } from '.'

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
