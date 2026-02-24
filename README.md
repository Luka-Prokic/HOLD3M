# HOLDEM

Gamified Habit Strategy App
React Native · Zustand · Local-First Architecture

---

## Overview

HOLDEM is a strategic habit tracking application built around a constrained daily decision model.

Instead of tracking unlimited habits, users receive a fixed 5-card “hand” each day. Each card represents a habit. The user chooses which cards to hold (complete) and which to burn (drop). The system transforms consistency into a structured progression model inspired by poker ranking logic — without using explicit evaluation language.

The product emphasizes:

	•	Constraint over volume
	•	Strategy over streak obsession
	•	Local-first persistence
	•	Minimal, intentional UI

This project was fully designed in Figma prior to implementation and engineered as a structured UI system in React Native.

---

## Core Concept

HOLDEM introduces a daily 5-card system:

	• Maximum 5 active habits per day
	• Hold to complete
	• Unheld cards disappear next day
	• Missed cards create empty history space
	• Numeric progression replaces explicit evaluation labels

Each day becomes a bounded decision environment rather than an open checklist.

---

## Tech Stack

	• [React Native](https://reactnative.dev/) + TypeScript  
	• [Expo](https://expo.dev/)  
	• [Zustand](https://github.com/pmndrs/zustand) for state management  

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Luka-Prokic/HOLD3M.git
```

### 2. Install dependencies

```bash
npm install
```
or

```bash
yarn install
```

### 3. Run

```bash
npx expo start
```
