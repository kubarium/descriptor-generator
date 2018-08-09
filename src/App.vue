<template>

  <main id="app">
    <div class="section">
      <h1 class="title is-4 has-text-centered">Descriptor Generator</h1>
    </div>
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="content">
              <h2 class="subtitle is-5">Instructions</h2>
              <ul>
                <li>
                  Fill fields with text by pressing
                  <span class="tag is-dark">Return</span> to separate entries
                </li>
                <li>Alternatively, swap the content of the fields</li>
              </ul>
            </div>
          </div>
          <div class="column is-half-mobile is-two-fifths-tablet is-one-third-desktop">
            <div class="level">
              <div class="level-left">
                <button class="button is-info is-fullwidth" @click="swap">
                  Swap Bits&Pieces
                </button>
              </div>
              <div class="level-right">
                <button class="button is-primary is-fullwidth" @click="generate" :disabled="bits.length === 0 || pieces.length===0">
                  Generate Descriptor
                </button>
              </div>
            </div>
            <div class="notification" :class="{hidden: bits_and_pieces.length===0}">
              {{bits_and_pieces}}
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="columns">
          <div class="column">
            <label class="label">Bits</label>
            <textarea class="textarea" rows="20" v-model="bits" placeholder="put your bits here, hit enter between each entry" />
          </div>
          <div class="column">
            <label class="label">Pieces</label>
            <textarea class="textarea" rows="20" v-model="pieces" placeholder="put your pieces here, hit enter between each entry" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      bits: localStorage.getItem("descriptorBits") || "",
      pieces: localStorage.getItem("descriptorPieces") || "",
      bits_and_pieces: ""
    };
  },
  watch: {
    bits: value => {
      localStorage.setItem("descriptorBits", value);
    },
    pieces: value => {
      localStorage.setItem("descriptorPieces", value);
    }
  },
  methods: {
    random(limit) {
      return Math.floor(Math.random() * limit);
    },
    generate() {
      let bits = this.bits.split("\n").filter(entry => entry !== "");
      let pieces = this.pieces.split("\n").filter(entry => entry !== "");

      this.bits_and_pieces = `${bits[this.random(bits.length)]} ${pieces[this.random(pieces.length)]}`;
    },
    swap() {
      const bits = this.bits;
      const pieces = this.pieces;

      this.pieces = bits;
      this.bits = pieces;
      localStorage.setItem("descriptorBits", pieces);
      localStorage.setItem("descriptorPieces", bits);
    }
  }
};
</script>

<style lang="scss">
main > .section {
  background: #222;
}

main .navbar {
  min-height: 80px;
}

.navbar .navbar-brand {
  align-items: center;
}

main .title {
  color: #ddd;
}

.hidden {
  display: none !important;
}

div .section {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

div .notification {
  padding: 0.75em;
}

.button {
  margin-left: 0.25em;
  margin-right: 0.25em;
}

@media screen and (max-width: 480px) {
  .level {
    width: max-content;
  }
}
</style>
