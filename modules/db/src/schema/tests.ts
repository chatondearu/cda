import { boolean, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { jsonb } from 'drizzle-orm/pg-core'

import { clans } from './clans'
import { rawDataColumn } from './core'

export const tests = pgTable('tests', {
  id: text('id').primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  rawData: rawDataColumn,
})

export const testClanQuestions = pgTable('test_clan_questions', {
  id: text('id').primaryKey(),
  testId: text('test_id').references(() => tests.id, { onDelete: 'cascade' }),
  questionIndex: integer('question_index'),
  text: text('text'),
  answers: jsonb('answers').$type<Record<string, string>>(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  testIdIdx: index('test_clan_questions_test_id_idx').on(table.testId),
}))

export const testClanAnswers = pgTable('test_clan_answers', {
  id: text('id').primaryKey(),
  testId: text('test_id').references(() => tests.id, { onDelete: 'cascade' }),
  questionIndex: integer('question_index'),
  answerA: text('answer_a'),
  answerB: text('answer_b'),
  answerC: text('answer_c'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  testIdIdx: index('test_clan_answers_test_id_idx').on(table.testId),
}))

export const testClanResponses = pgTable('test_clan_responses', {
  id: text('id').primaryKey(),
  testId: text('test_id').references(() => tests.id, { onDelete: 'cascade' }),
  currentQuestion: text('current_question'),
  isDone: boolean('is_done'),
  resultClanId: text('result_clan_id').references(() => clans.id, { onDelete: 'set null' }),
  list: jsonb('list').$type<Record<string, string>>(),
  totalsMembers: integer('totals_members'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  testIdIdx: index('test_clan_responses_test_id_idx').on(table.testId),
  resultClanIdIdx: index('test_clan_responses_result_clan_id_idx').on(table.resultClanId),
}))
