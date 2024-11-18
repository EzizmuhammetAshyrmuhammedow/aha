<template>
  <div class="q-pa-md">
    <q-btn flat label="Gozle" icon="search">
      <q-menu>
        <form>
          <div class="column no-wrap q-pa-md">
            <header class="row items-center">
              <div class="text-subtitle1 q-mt-xs q-mb-xs">Gozle</div>

            </header>

            <q-separator />
            <main class="row items-center">
              <q-input dense outlined class=""  model-value="" label="Gozle..."/>
            </main>

            <q-separator />

            <footer class="row items-center justify-end q-gutter-sm q-mt-xs">
              <q-btn dense color="primary" label="Gozle" icon="search"></q-btn>
              <q-btn dense color="primary" label="Anyk Gozle..."></q-btn>
            </footer>
          </div>
        </form>
      </q-menu>
    </q-btn>
  </div>
</template>


