<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" encoding="utf-8" indent="yes" doctype-system="about:legacy-compat" />
    <xsl:template match="/page">
        <html class="no-js" lang="en">
            <head>
                <title><xsl:value-of select="./short/@value"/></title>
                <meta name="description">
                  <xsl:attribute name="content">
                    <xsl:value-of select="./short/@value"/>
                    <xsl:value-of select="./long/@value"/>
                  </xsl:attribute>
                </meta>
                <meta property="og:title">
                  <xsl:attribute name="content"><xsl:value-of select="./short/@value"/></xsl:attribute>
                </meta>
                <meta property="og:description">
                  <xsl:attribute name="content">
                     <xsl:value-of select="./short/@value"/>
                     <xsl:value-of select="./long/@value"/>
                  </xsl:attribute>
                </meta>
                <meta property="article:published_time">
                  <xsl:attribute name="content"><xsl:value-of select="./datetime/@value"/></xsl:attribute>
                </meta>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title">
                  <xsl:attribute name="content"><xsl:value-of select="./short/@value"/></xsl:attribute>
                </meta>
                <meta name="twitter:description">
                  <xsl:attribute name="content">
                     <xsl:value-of select="./short/@value"/>
                     <xsl:value-of select="./long/@value"/>
                  </xsl:attribute>
                </meta>
                <xsl:copy-of select="./head/*" />
                <meta charset="UTF-8" />
                <meta http-equiv="x-ua-compatible" content="ie=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="dns-prefetch" href="//s.w.org" />
                <link rel="icon" href="favicon.ico" sizes="75x75"/>
                <meta property="article:author" content="Tecq Mate"/>
                <meta property="og:type" content="website"/>
            </head>
        </html>
        <body>
            <div class="topnav" id="myTopnav">
                <a href="https://watchologyy.com">Watchologyy</a>
                <a href="https://watchologyy.com/shop">Shop</a>
                <a href="https://watchologyy.com/cart">Cart</a>
            </div>
            <div class="break"></div>
            <xsl:copy-of select="./body/*" />
            <footer>
              Copyright 2021, Tecq Mate
            </footer>
        </body>
    </xsl:template>
</xsl:stylesheet>
