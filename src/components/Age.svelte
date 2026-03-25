<script lang="ts">
  import { DateTime } from "luxon";

  const birthday = DateTime.fromISO("2005-12-18T00:00:00+01:00");
  const alive = birthday
    .diffNow(["year", "month", "day", "hour", "minute", "second"])
    .negate()
    .mapUnits(Math.floor);
</script>

<span id="age" title={alive.toHuman().replaceAll(",", "")}
  >{Math.floor(alive.as("year"))} year old</span
>

<style>
  #age {
    cursor: help;
    text-decoration: underline dotted;
  }
</style>
