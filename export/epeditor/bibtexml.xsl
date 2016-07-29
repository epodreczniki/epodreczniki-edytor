<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
  xmlns:bibtex="http://bibtexml.sf.net/"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ep="http://epodreczniki.pl/"
  exclude-result-prefixes="ep bibtex">

  <xsl:template match="bibtex:*"></xsl:template>
  
  <xsl:template match="bibtex:file">
    <div class='bibliography'>
      <div class='bibliography-header'>
        <xsl:apply-templates select="current()" mode="label"/>
      </div>
      <ol>
        <xsl:apply-templates select="bibtex:entry"/>
      </ol>
    </div>
  </xsl:template>
  
  <xsl:template match="bibtex:entry">
        <div id="{@id}" class="bib-entry {concat('bib-', local-name(*))}">
          <xsl:apply-templates/>
        </div>

  </xsl:template>
	
	<xsl:template match="bibtex:*[ancestor::bibtex:entry]">
		<xsl:element name="span">
				<xsl:attribute name="class">
						<xsl:value-of select="concat(local-name(), '-contents')"/>
				</xsl:attribute>
				<xsl:apply-templates select="node()"></xsl:apply-templates>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="bibtex:incollection[ancestor::bibtex:entry]|bibtex:incollectionFree[ancestor::bibtex:entry]">
		<xsl:element name="div">
				<xsl:attribute name="class">
						<xsl:value-of select="local-name()"/>
				</xsl:attribute>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-header')"/>
								<xsl:text> header</xsl:text>
						</xsl:attribute>
						<xsl:apply-templates select="current()" mode="label"/>
				</xsl:element>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-contents')"/>
						</xsl:attribute>
								
						<div class="author"><xsl:apply-templates select="bibtex:author"/>.</div>
						<div class="booktitle"><xsl:apply-templates select="bibtex:booktitle"/>,</div>
						<xsl:if test="./bibtex:title != ./bibtex:booktitle or ./bibtex:booktitle=''">
							<div class="title"><xsl:apply-templates select="bibtex:title"/>,</div>
						</xsl:if>
						<xsl:if test="./bibtex:edition">
							<div class="edition">red. <xsl:apply-templates select="bibtex:edition"/>,</div>
						</xsl:if>
						<xsl:if test="./bibtex:series">
							<div class="series"><xsl:apply-templates select="bibtex:series"/>,</div>
						</xsl:if>
						<xsl:if test="./bibtex:editor">
							<div class="editor">tł. <xsl:apply-templates select="bibtex:editor"/>,</div>						
						</xsl:if>
						<div class="address"><xsl:apply-templates select="bibtex:address"/>,</div>
						<xsl:choose>
							<xsl:when test="./bibtex:pages">
								<div class="year"><xsl:apply-templates select="bibtex:year"/>, </div>
								<div class="pages">s. <xsl:apply-templates select="bibtex:pages"/>.</div>
							</xsl:when>
							<xsl:when test="./bibtex:year">
								<div class="year"><xsl:apply-templates select="bibtex:year"/>.</div>
							</xsl:when>
						</xsl:choose>
						<xsl:apply-templates select="ep:bibliographyPattern"/>
				</xsl:element>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="ep:bibliographyPattern">
		<xsl:apply-templates select="node()"/>
	</xsl:template>
	
	<xsl:template match="ep:*[parent::ep:bibliographyPattern]">
		<xsl:text disable-output-escaping="yes">&lt;</xsl:text>
		<xsl:apply-templates select="current()" mode="label"/>
		<xsl:text disable-output-escaping="yes">&gt;</xsl:text>
	</xsl:template>
	
  <xsl:template match="bibtex:unpublished[ancestor::bibtex:entry]">
		<xsl:element name="div">
				<xsl:attribute name="class">
						<xsl:value-of select="local-name()"/>
				</xsl:attribute>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-header')"/>
								<xsl:text> header</xsl:text>
						</xsl:attribute>
						<xsl:apply-templates select="current()" mode="label"/>
				</xsl:element>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-contents')"/>
						</xsl:attribute>
						
						<div class="author"><xsl:apply-templates select="bibtex:author"/>.</div>
						<div class="year">(<xsl:apply-templates select="bibtex:year"/>).</div>
						<div class="title"><xsl:apply-templates select="bibtex:title"/>.</div>
					
						<xsl:apply-templates select="ep:bibliographyPattern"/>
				</xsl:element>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="bibtex:article[ancestor::bibtex:entry]">
		<xsl:element name="div">
				<xsl:attribute name="class">
						<xsl:value-of select="local-name()"/>
				</xsl:attribute>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-header')"/>
								<xsl:text> header</xsl:text>
						</xsl:attribute>
						<xsl:apply-templates select="current()" mode="label"/>
				</xsl:element>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-contents')"/>
						</xsl:attribute>
						
						<div class="author"><xsl:apply-templates select="bibtex:author"/>.</div>
						<div class="title"><xsl:apply-templates select="bibtex:title"/>.</div>
						<div class="jurnal"><xsl:apply-templates select="bibtex:journal"/>,</div>
						<div class="year"><xsl:apply-templates select="bibtex:year"/>,</div>
						<xsl:if test="./bibtex:number">
							<div class="number">nr. <xsl:apply-templates select="bibtex:number"/>.</div>
						</xsl:if>
					
						<xsl:apply-templates select="ep:bibliographyPattern"/>
				</xsl:element>
		</xsl:element>
	</xsl:template>
	
	  <xsl:template match="bibtex:manual[ancestor::bibtex:entry]">
		<xsl:variable name="name" select="local-name()"></xsl:variable>
		<xsl:element name="div">
				<xsl:attribute name="class">
						<xsl:value-of select="local-name()"/>
				</xsl:attribute>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-header')"/>
								<xsl:text> header</xsl:text>
						</xsl:attribute>
						<xsl:apply-templates select="current()" mode="label"/>
				</xsl:element>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-contents')"/>
						</xsl:attribute>
						
						<div class="organization"><xsl:apply-templates select="bibtex:organization"/></div>
						<div class="edition">z dnia <xsl:apply-templates select="bibtex:edition"/></div>
						<div class="title"><xsl:apply-templates select="bibtex:title"/></div>
						<div class="key">(<xsl:apply-templates select="bibtex:key"/>)</div>
					
						<xsl:apply-templates select="ep:bibliographyPattern"/>
				</xsl:element>
		</xsl:element>
	</xsl:template>
	
	 <xsl:template match="bibtex:misc[ancestor::bibtex:entry]">
		<xsl:variable name="name" select="local-name()"></xsl:variable>
		<xsl:element name="div">
				<xsl:attribute name="class">
						<xsl:value-of select="local-name()"/>
				</xsl:attribute>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-header')"/>
								<xsl:text> header</xsl:text>
						</xsl:attribute>
						<xsl:apply-templates select="current()" mode="label"/>
				</xsl:element>
				<xsl:element name="div">
						<xsl:attribute name="class">
								<xsl:value-of select="concat(local-name(), '-contents')"/>
						</xsl:attribute>
						
						<xsl:if test="./bibtex:author">
							<div class="author"><xsl:apply-templates select="bibtex:author"/></div>
						</xsl:if>
						<div class="title"><xsl:apply-templates select="bibtex:title"/> [online]</div>
						<div class="note">[dostęp: <xsl:apply-templates select="bibtex:note"/>].</div>
						<div class="howpublished">Dostępne w internecie: <xsl:apply-templates select="bibtex:howpublished"/>.</div>
					
						<xsl:apply-templates select="ep:bibliographyPattern"/>
				</xsl:element>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
