<template>
  <div class="getting">
    <button @click="getSelectedRows()">Get Selected Rows</button>
    <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        rowSelection="multiple"
        @grid-ready="onGridReady"
        :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
export default {
  name: "getting",
  data() {
    return {
      columnDefs: null,
      rowData: null
    }
  },
  beforeMount() {
    this.columnDefs = [
      { field: 'make', sortable: true, filter: true },
      { field: 'model', sortable: true, filter: true },
      { field: 'price', sortable: true, filter: true }
    ];

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  },
  mounted() {
  },
  computed: {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map( node => node.data );
      const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
