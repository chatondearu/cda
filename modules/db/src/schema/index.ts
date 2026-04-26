import { relations } from 'drizzle-orm'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { clanEvents } from './clan-events'
import { clanRewards } from './clan-rewards'
import { clans } from './clans'
import { profiles } from './profiles'
import { testClanAnswers, testClanQuestions, testClanResponses, tests } from './tests'

export { clanEvents, clanRewards, clans, profiles, testClanAnswers, testClanQuestions, testClanResponses, tests }

export const clansRelations = relations(clans, ({ many }) => ({
  profiles: many(profiles),
  events: many(clanEvents),
  responses: many(testClanResponses),
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  clan: one(clans, {
    fields: [profiles.clanId],
    references: [clans.id],
  }),
}))

export const clanRewardsRelations = relations(clanRewards, ({ many }) => ({
  events: many(clanEvents),
}))

export const clanEventsRelations = relations(clanEvents, ({ one }) => ({
  clan: one(clans, {
    fields: [clanEvents.clanId],
    references: [clans.id],
  }),
  reward: one(clanRewards, {
    fields: [clanEvents.clanRewardId],
    references: [clanRewards.id],
  }),
  author: one(profiles, {
    fields: [clanEvents.authorId],
    references: [profiles.id],
  }),
}))

export const testsRelations = relations(tests, ({ many }) => ({
  questions: many(testClanQuestions),
  answers: many(testClanAnswers),
  responses: many(testClanResponses),
}))

export const testClanQuestionsRelations = relations(testClanQuestions, ({ one }) => ({
  test: one(tests, {
    fields: [testClanQuestions.testId],
    references: [tests.id],
  }),
}))

export const testClanAnswersRelations = relations(testClanAnswers, ({ one }) => ({
  test: one(tests, {
    fields: [testClanAnswers.testId],
    references: [tests.id],
  }),
}))

export const testClanResponsesRelations = relations(testClanResponses, ({ one }) => ({
  test: one(tests, {
    fields: [testClanResponses.testId],
    references: [tests.id],
  }),
  resultClan: one(clans, {
    fields: [testClanResponses.resultClanId],
    references: [clans.id],
  }),
}))

export type Clan = InferSelectModel<typeof clans>
export type NewClan = InferInsertModel<typeof clans>
export type Profile = InferSelectModel<typeof profiles>
export type NewProfile = InferInsertModel<typeof profiles>
export type ClanReward = InferSelectModel<typeof clanRewards>
export type NewClanReward = InferInsertModel<typeof clanRewards>
export type ClanEvent = InferSelectModel<typeof clanEvents>
export type NewClanEvent = InferInsertModel<typeof clanEvents>
export type Test = InferSelectModel<typeof tests>
export type NewTest = InferInsertModel<typeof tests>
export type TestClanQuestion = InferSelectModel<typeof testClanQuestions>
export type NewTestClanQuestion = InferInsertModel<typeof testClanQuestions>
export type TestClanAnswer = InferSelectModel<typeof testClanAnswers>
export type NewTestClanAnswer = InferInsertModel<typeof testClanAnswers>
export type TestClanResponse = InferSelectModel<typeof testClanResponses>
export type NewTestClanResponse = InferInsertModel<typeof testClanResponses>
