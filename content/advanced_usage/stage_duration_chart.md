---
description: GoCD provides a chart on the stage details page which can be used for trend analysis of the stage's periodic runs.
keywords: stage duration, stage analysis, periodic runs, GoCD graphs
title: Graphs
---

# Graphs

## Stage Duration Chart

GoCD provides a chart on the stage details page which can be used for trend analysis of the stage's periodic runs. This graph shows two line graphs, one each for passed and failed stage instances which are plotted using the total duration of the last 300 stage instances.

#### To navigate to the Graphs:

1.  Click on the stage bar of the relevant stage on the pipelines dashboard.
2.  Click on the tab 'Graphs'.

#### Features of the Graph

The following is a snapshot of a stage duration chart

![](../images/stage_duration_graph.png)

Selecting a part of the graph zooms into the selected area. Once zoomed, a link called 'Reset Zoom' Appears on the chart which resets the graph.

**Key:**

1.  The title shows the start and end dates of the range of the chart.
2.  A tooltip giving the details of the stage run appears on hover over the points of the line graph.
3.  Navigates to the Chart of older 300 runs.
4.  Navigates to the Chart of newer 300 runs.
5.  Toggles the line graph of the failed runs.
6.  Toggles the line graph of the passed runs.
