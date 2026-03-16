# Project Context

## Project Name

Yupi TV Admin

## Product Overview

Yupi TV Admin is a modern, responsive admin portal designed to manage and consume live streaming content from multiple platforms in one place.

The platform aggregates streamers from services such as:

- YouTube
- Twitch
- Kick
- (future platforms may be added)

The goal is to provide a clean and engaging interface where users can easily discover, monitor, and organize their favorite streamers.

The UI should feel modern, fast, and visually appealing while remaining simple and usable.

## Problem the Product Solves

Users who follow multiple streamers across different platforms often have to switch between multiple websites.

Yupi TV Admin centralizes this experience by allowing users to:

- discover streamers
- track activity
- organize favorites
- quickly access content from different platforms

All from a single interface.

## Target Users

Primary users:

- viewers who follow multiple streamers
- users who want a unified dashboard for streaming content

Secondary users:

- admins or operators managing the platform
- moderators or content curators

## Domain Concepts

Streamer  
A content creator who streams on platforms such as Twitch, YouTube, or Kick.

Platform  
The streaming service where a streamer broadcasts.

Favorite  
A user-marked streamer for quick access and tracking.

Stream  
A live broadcast session.

Dashboard  
The main overview screen showing recent or relevant information.

## Product Goals

- Centralize streaming content across platforms
- Provide a fast and visually appealing dashboard
- Allow users to organize their favorite streamers
- Make it easy to discover and access streams
- Maintain a clean and intuitive UI

## MVP Scope

The initial version focuses on core browsing and organization features.

### 1. Layout (Shell)

Main application structure including:

- sidebar navigation
- header
- main content area

The layout must be responsive and work well on desktop and tablet.

### 2. Dashboard

Overview screen showing:

- favorite streamers
- recently viewed or active streamers
- useful quick-access cards

The dashboard should provide a quick snapshot of relevant activity.

### 3. Streamers

Features:

- list of streamers
- search functionality
- streamer detail view

Users should be able to quickly find and inspect streamers.

### 4. Favorites

Basic favorite management.

Users can:

- add a streamer to favorites
- remove from favorites
- quickly access favorite streamers

Initial implementation may use local storage.

### 5. Settings

User preferences such as:

- UI theme
- density
- language (optional)

Settings should allow users to personalize the interface.

## UX Principles

- Mobile-first responsive design
- Clear visual hierarchy
- Minimal cognitive load
- Fast interaction feedback

Every screen should handle the following states:

- loading
- empty
- error

Basic accessibility should be considered:

- proper labels
- focus states
- keyboard navigation where reasonable

## Design Philosophy

The interface should feel:

- modern
- clean
- lightweight
- visually engaging

Avoid overly complex layouts.

Favor clarity and usability over visual noise.

## Technical Reference

All implementation rules, coding conventions, and architectural constraints are defined in:

- `.ai/rules.md`
- `.ai/architecture.md`
- `.ai/ownership.md`
- `.ai/execution.md`

These files define how the project must be implemented technically.
