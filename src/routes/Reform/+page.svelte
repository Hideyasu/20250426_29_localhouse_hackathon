<script lang="ts">
  import { goto } from '$app/navigation';

  let selectedOptions: string[] = [];

  const reformOptions = {
    水回り: ['キッチン', '風呂・浴槽', 'トイレ', '洗面所'],
    屋外: ['外壁塗装・外壁', '屋根塗装・屋根', 'ウッドデッキ', 'ベランダ・バルコニー', 'フェンス', 'ガレージ'],
    屋内: ['リビング', 'ダイニング', '洋室', '和室', '廊下', '階段', '玄関', 'エントランス'],
    その他: ['家全体・リノベーション', 'その他']
  };

  const simulateReform = () => {
    goto('/BeforeAfter');
  };
</script>

<h1>Reform</h1>
<form on:submit|preventDefault={simulateReform}>
  {#each Object.entries(reformOptions) as [category, items]}
    <fieldset>
      <legend>{category}</legend>
      {#each items as item}
        <label>
          <input type="checkbox" bind:group={selectedOptions} value={item} />
          {item}
        </label>
      {/each}
    </fieldset>
  {/each}
  <button type="submit">このリフォームでシミュレーション</button>
</form>

<style>
  fieldset {
    margin-bottom: 20px;
  }
  legend {
    font-weight: bold;
  }
  label {
    display: block;
    margin: 5px 0;
  }
</style>