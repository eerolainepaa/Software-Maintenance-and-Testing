const { Builder, By, until } = require('selenium-webdriver');

(async function testHexRgbConverter() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    console.log('Opening the converter page...');
    await driver.get('http://127.0.0.1:5500/ex5/index.html'); // adjust port/path if needed

    // ── Hex → RGB: Valid case ────────────────────────────────────────────────
    console.log('\n=== Test: Valid Hex → RGB (#FF5733) ===');
    const hexInput = await driver.wait(
      until.elementLocated(By.id('hexInput')),
      10000,
      'Could not find hexInput'
    );

    await hexInput.clear();
    await hexInput.sendKeys('#FF5733');

    const convertHexBtn = await driver.wait(
      until.elementIsVisible(await driver.findElement(By.id('convertHexBtn'))),
      8000
    );
    await convertHexBtn.click();

    await driver.wait(async () => {
      const text = await driver.findElement(By.id('rgbResult')).getText();
      return text.includes('255, 87, 51');
    }, 10000, 'RGB result did not update');

    let rgbText = await driver.findElement(By.id('rgbResult')).getText();
    console.log('RGB Result:', rgbText.trim());
    console.log(rgbText.includes('255, 87, 51') ? '→ PASS' : '→ FAIL');

    // Preview check
    let previewBg = await driver.findElement(By.id('colorPreview')).getCssValue('background-color');
    console.log('Preview background:', previewBg);
    console.log(
      previewBg.includes('255, 87, 51') || previewBg.includes('rgb(255, 87, 51)')
        ? '→ PASS preview'
        : '→ FAIL preview'
    );

    // ── Hex → RGB: Valid case ────────────────────────────────────────────────
    console.log('\n=== Test: Valid Hex → RGB (FFF) ===');

    await hexInput.clear();
    await hexInput.sendKeys('FFF');

    await convertHexBtn.click();

    await driver.wait(async () => {
      const text = await driver.findElement(By.id('rgbResult')).getText();
      return text.includes('255, 255, 255');
    }, 10000, 'RGB result did not update');

    rgbText = await driver.findElement(By.id('rgbResult')).getText();
    console.log('RGB Result:', rgbText.trim());
    console.log(rgbText.includes('255, 255, 255') ? '→ PASS' : '→ FAIL');

    await driver.sleep(800)
    // Preview check
    previewBg = await driver.findElement(By.id('colorPreview')).getCssValue('background-color');
    console.log('Preview background:', previewBg);
    console.log(
      previewBg.includes('255, 255, 255') || previewBg.includes('rgb(255, 255, 255)')
        ? '→ PASS preview'
        : '→ FAIL preview'
    );

    // ── Hex → RGB: Invalid case – "ZZZ" ──────────────────────────────────────
    console.log('\n=== Test: Invalid Hex – ZZZ ===');
    await hexInput.clear();
    await hexInput.sendKeys('ZZZ');
    await convertHexBtn.click();

    await driver.sleep(800); // brief wait for error to appear

    const hexError = await driver.findElement(By.id('hexError')).getText();
    console.log('Error message:', hexError.trim());
    console.log(
      hexError.includes('Invalid') || hexError.includes('error')
        ? '→ PASS: Error shown'
        : '→ FAIL: No error message'
    );

    // ── RGB → Hex: Valid case – 0 255 0 ──────────────────────────────────────
    console.log('\n=== Test: Valid RGB → Hex (0, 255, 0) ===');
    const rInput = await driver.findElement(By.id('r'));
    const gInput = await driver.findElement(By.id('g'));
    const bInput = await driver.findElement(By.id('b'));

    await rInput.clear(); await rInput.sendKeys('0');
    await gInput.clear(); await gInput.sendKeys('255');
    await bInput.clear(); await bInput.sendKeys('0');

    const convertRgbBtn = await driver.wait(
      until.elementIsVisible(await driver.findElement(By.id('convertRgbBtn'))),
      8000
    );
    await convertRgbBtn.click();

    await driver.wait(async () => {
      const text = await driver.findElement(By.id('hexResult')).getText();
      return text.includes('#00FF00');
    }, 10000, 'Hex result did not update');

    const hexResult = await driver.findElement(By.id('hexResult')).getText();
    console.log('Hex Result:', hexResult.trim());
    console.log(hexResult.includes('#00FF00') ? '→ PASS' : '→ FAIL');

    // Preview check
    await driver.sleep(800)
    previewBg = await driver.findElement(By.id('colorPreview')).getCssValue('background-color');
    console.log('Preview background:', previewBg);
    console.log(
      previewBg.includes('0, 255, 0') || previewBg.includes('rgb(0, 255, 0)')
        ? '→ PASS preview'
        : '→ FAIL preview'
    );

    // ── RGB → Hex: Invalid case – 0 260 0 ────────────────────────────────────
    console.log('\n=== Test: Invalid RGB – 0 260 0 ===');
    await rInput.clear(); await rInput.sendKeys('0');
    await gInput.clear(); await gInput.sendKeys('260');
    await bInput.clear(); await bInput.sendKeys('0');

    await convertRgbBtn.click();

    // Wait for error to appear
    await driver.wait(async () => {
    const errorElem = await driver.findElement(By.id('rgbError'));
    const text = await errorElem.getText();
    return text.trim().length > 0;
    }, 10000, 'RGB error message did not appear after invalid input');

    const rgbErrorText = await driver.findElement(By.id('rgbError')).getText();
    console.log('Error message:', rgbErrorText.trim());

    const errorPassed = 
    rgbErrorText.includes('0 and 255') || 
    rgbErrorText.includes('valid') || 
    rgbErrorText.includes('between');

    console.log(errorPassed ? '→ PASS: Error shown' : '→ FAIL: No error message');

// Also check that result is still "—"
// const hexAfterError = await driver.findElement(By.id('hexResult')).getText();
// console.log('Hex result after invalid:', hexAfterError.trim());
// console.log(hexAfterError.includes('—') ? '→ PASS: Result reset' : '→ FAIL: Result not reset');

  } catch (err) {
    console.error('\nTest failed:', err);
    // Optional: take screenshot on error
    const fs = require('fs');
    try {
      fs.writeFileSync('error-screenshot.png', await driver.takeScreenshot(), 'base64');
      console.log('Screenshot saved: error-screenshot.png');
    } catch (e) {}
  } finally {
    await driver.quit();
    console.log('\nTest session closed.');
  }
})();