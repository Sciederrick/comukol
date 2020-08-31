<template>
  <div id="events" class="pt-4 h-screen">
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
            National Enteric Surveillance Program (NESP) reports that E. coli O157 is above expected levels nationally, as well as in Saskatchewan and Manitoba for the week of July 13-19, 2014.
            PulseNet Canada reports a multi-provincial cluster of six E. coli O157:H7 isolates with the same PFGE patterns in Manitoba (2), Saskatchewan (3) and Alberta (1).
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">
            OICC Assessment call is held with CFIA, Health Canada, National Microbiology Laboratory, and provincial public health partners in Manitoba, Saskatchewan, and Alberta. A national OICC activated.
          	SK reports five unconfirmed cases with clinical symptoms that attended the same Canada Day BBQ as two confirmed cases from SK.
          	CFIA is beginning traceback on lettuce.
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">
            Six additional PFGE matches are reported by PulseNet Canada: Saskatchewan (1), Manitoba (2), Alberta (2), and British Columbia (1). The case count is now 12.
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
