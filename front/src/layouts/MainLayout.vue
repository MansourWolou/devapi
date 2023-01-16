<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <img
            alt="app logo"
            src="/public/icons/logo.png"
            style="width: 30px; height: 30px"
          >
        </q-toolbar-title>
        <router-link color="accent" to="/login">
          Se connecter
        </router-link>
        <q-btn outline rounded label="S'inscrire" color="accent" no-caps class="q-mx-md" to="/register"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
</script>
