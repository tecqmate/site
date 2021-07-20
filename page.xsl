<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" encoding="utf-8" indent="yes" doctype-system="about:legacy-compat" />
    <xsl:template match="/html">
        <html lang="en">
            <head>
                <title><xsl:value-of select="./head/short/@value"/></title>
                <meta name="description">
                  <xsl:attribute name="content">
                    <xsl:value-of select="./head/short/@value"/>
                    <xsl:value-of select="./head/long/@value"/>
                  </xsl:attribute>
                </meta>
                <meta property="og:title">
                  <xsl:attribute name="content"><xsl:value-of select="./head/short/@value"/></xsl:attribute>
                </meta>
                <meta property="og:description">
                  <xsl:attribute name="content">
                     <xsl:value-of select="./head/short/@value"/>
                     <xsl:value-of select="./head/long/@value"/>
                  </xsl:attribute>
                </meta>
                <meta property="article:published_time">
                  <xsl:attribute name="content"><xsl:value-of select="./head/datetime/@value"/></xsl:attribute>
                </meta>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title">
                  <xsl:attribute name="content"><xsl:value-of select="./head/short/@value"/></xsl:attribute>
                </meta>
                <meta name="twitter:description">
                  <xsl:attribute name="content">
                     <xsl:value-of select="./head/short/@value"/>
                     <xsl:value-of select="./head/long/@value"/>
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
				<link href="styles.css" rel="stylesheet" />
            </head>
        </html>
        <body>
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container">
					<a class="navbar-brand" href="https://tecqmate.github.io/site">Tecq Mate</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
							<li class="nav-item"><a class="nav-link" href="https://tecqmate.github.io/site">Home</a></li>
							<li class="nav-item"><a class="nav-link" href="https://tecqmate.github.io/about#contact" target="_blank">Donate</a></li>
						</ul>
					</div>
				</div>
			</nav>
			<header class="py-1 bg-light border-bottom mb-4">
				<div class="container">
					<div class="text-center my-1">
						<p class="lead mb-0">A free service platform supported by your donations.</p>
					</div>
				</div>
			</header>
			<div class="container">
				<div class="row">
					<div class="col-lg-8">
						<div class="row">
							<xsl:copy-of select="./body/main/*"/>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="card mb-4">
							<div class="card-header">Services</div>
							<div class="card-body">
								<div class="row">
									<div class="col-sm-6">
										<ul class="list-unstyled mb-0">
											<li><a href="tiny">Tiny URL</a></li>
											<li><a href="#!">HTML</a></li>
											<li><a href="#!">Freebies</a></li>
										</ul>
									</div>
									<div class="col-sm-6">
										<ul class="list-unstyled mb-0">
											<li><a href="#!">JavaScript</a></li>
											<li><a href="#!">CSS</a></li>
											<li><a href="#!">Tutorials</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="card mb-4">
							<div class="card-header">Alert</div>
							<div class="card-body">Important notice will appear here</div>
						</div>
						<div class="card mb-4">
							<div class="card-header">Ads</div>
							<div class="card-body">Ads will appear here</div>
						</div>
					</div>
				</div>
			</div>
			<footer class="py-4 bg-dark">
				<div class="container my-4"><p class="m-0 text-center text-white">Copyright &#x000A9; Tecq Mate 2012</p></div>
			</footer>
			<script src="jquery-3.5.0.min.js"></script>
			<xsl:copy-of select="./body/template/*"/>
        </body>
    </xsl:template>
</xsl:stylesheet>
