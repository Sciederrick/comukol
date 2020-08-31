<template>
  <div id="events" class="pt-4 h-screen text-xs md:text-base">
    <popover name="events">
      <p class="text-sm">Powered by the inputs of individual team members from the profile reporting section<fa-icon :icon="['fas', 'user-circle']" size="1x" color="gold" class="ml-2"/></p>
    </popover>
    <table class="table-auto mx-auto lg:w-3/4">
      <thead>
        <tr>
          <th class="px-4 py-2" v-popover.bottom="{name: 'events', event: 'hover'}">Chronology of Events</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <tr>
          <td class="border px-4 py-2">
            Day 1: Monday, July 21, 2014 (6 confirmed cases: MB-2, SK-3, AB-1)
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">
            National Enteric Surveillance Program (NESP) reports that V.Cholerae O137 is above expected levels nationally, as well as in Moiben and Kapseret for the week of July 13-19, 2014.
            PulseNet Kenya reports a multi-provincial cluster of six V.Cholerae O137:H7 isolates with the same PFGE patterns in Kapseret (2), Moiben (3) and Ainabkoi (1).
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">
            OICC Assessment call is held with CFIA, Health Kenya, National Microbiology Laboratory, and provincial public health partners in Kapseret, Moiben, and Ainabkoi. A national OICC activated.
          	SK reports five unconfirmed cases with clinical symptoms that attended the same Kenya Day BBQ as two confirmed cases from SK.
          	CFIA is beginning traceback on lettuce.
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">
            Six additional PFGE matches are reported by PulseNet Kenya: Moiben (1), Kapseret (2), Ainabkoi (2), and British Columbia (1). The case count is now 12.
            A technical epidemiology call is held at 14:00. On the call, the provinces agree to interview cases using a standardized E. coli hypothesis generating questionnaire.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "../router"

export default {
  name: 'Events',
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style>

</style>
