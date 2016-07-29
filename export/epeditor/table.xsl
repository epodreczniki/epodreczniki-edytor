<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:cnx="http://cnx.rice.edu/cnxml" 
	xmlns:md="http://cnx.rice.edu/mdml"
	xmlns:ep="http://epodreczniki.pl/"
	exclude-result-prefixes="cnx md"
	version="1.0">
  
  <xsl:template name="IdCheck">
    <xsl:if test="@id">
      <xsl:attribute name="id">
        <xsl:value-of select="@id"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>

  <xsl:template name="class-test">
    <xsl:param name="provided-class"/>
    <xsl:param name="wanted-class"/>
    <xsl:if test="$provided-class = $wanted-class or
      starts-with($provided-class, concat($wanted-class, ' ')) or
      contains($provided-class, concat(' ', $wanted-class, ' ')) or
      substring($provided-class, string-length($provided-class) - string-length($wanted-class)) = concat(' ', $wanted-class)">
      1
    </xsl:if>
  </xsl:template>
  
  <xsl:template match="cnx:table">
    <div>
      <xsl:attribute name="class">
        <xsl:text>table</xsl:text>
      </xsl:attribute>
      <xsl:call-template name="IdCheck"/>
	  <table>
	    <xsl:apply-templates select="@ep:*|@pgwide"/>
	    <xsl:if test="cnx:name[node()] or cnx:title[node()] or cnx:caption[node()] or cnx:label[node()]"> 
	  	  <xsl:if test="not(contains(ancestor::cnx:document/@id, 'second_page'))">
	  	    <caption class="table-text">
            		<xsl:if test="cnx:label[node()] or (not(cnx:label[not(node())]) and not(ancestor::*[1][self::cnx:figure or self::cnx:subfigure]))">
                	<span class="label">
                    <xsl:choose>
                      <xsl:when test="cnx:label">
                        <xsl:apply-templates select="cnx:label"/>
                      </xsl:when>
                      <xsl:otherwise>
                        Tabela
                      </xsl:otherwise>
                    </xsl:choose>
                    <xsl:if test="cnx:name[node()] or cnx:title[node()] or cnx:caption[node()]">
                      <xsl:text>&#160;</xsl:text>
                    </xsl:if>
                  </span>
                </xsl:if>
                <xsl:apply-templates select="cnx:name|cnx:title"/>
                <xsl:if test="cnx:caption[node()]">
                  <xsl:variable name="caption-element">
                    <xsl:choose>
                      <xsl:when test="cnx:name[node()] or cnx:title[node()]">div</xsl:when>
                      <xsl:otherwise>span</xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>
                  <xsl:element name="{$caption-element}">
                  	<xsl:attribute name="class">table-caption</xsl:attribute>
                    <xsl:if test="cnx:caption/@id">
                      <xsl:attribute name="id">
                        <xsl:value-of select="cnx:caption/@id"/>
                      </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="cnx:caption"/>
                  </xsl:element>
                </xsl:if>
              </caption>
	  	  </xsl:if>
            </xsl:if>
	    <xsl:choose>
	      <xsl:when test="count(cnx:tgroup) &gt; 1">
		<tbody>
		  <xsl:for-each select="cnx:tgroup">
		    <tr>
		      <td>
			<table>
	    		  <xsl:apply-templates select="self::cnx:tgroup"/>
			</table>
		      </td>
		    </tr>
		  </xsl:for-each>
		</tbody>
	      </xsl:when>
	      <xsl:otherwise>
		<xsl:apply-templates select="cnx:tgroup"/>
	      </xsl:otherwise>
	    </xsl:choose>
	  </table>
    </div>  
  </xsl:template>

  <xsl:template match="@pgwide">
    <xsl:attribute name="width">
      <xsl:value-of select="concat(., '%')"/>
    </xsl:attribute>
  </xsl:template>
  
  <xsl:template match="cnx:colspec|cnx:spanspec"/>

  <xsl:template match="cnx:tgroup">    
    <xsl:call-template name="IdCheck"/>
    <xsl:if test="cnx:colspec/@colwidth or child::*/cnx:colspec/@colwidth">
      <colgroup>
	<xsl:call-template name="col.maker"/>
      </colgroup>
    </xsl:if>
    <xsl:apply-templates select="cnx:thead"/>
    <xsl:apply-templates select="cnx:tbody"/>
    <xsl:apply-templates select="cnx:tfoot"/>
  </xsl:template>

  <xsl:template match="cnx:entrytbl">
  	<td class="entrytbl">
      <xsl:call-template name="IdCheck"/>
      <xsl:if test="(@namest and @nameend) or @spanname">
	<xsl:attribute name="colspan">
	  <xsl:call-template name="calculate.colspan"/>
	</xsl:attribute>
      </xsl:if>
      <table>
	<xsl:if test="cnx:colspec/@colwidth or child::*/cnx:colspec/@colwidth">
	  <colgroup>
	    <xsl:call-template name="col.maker"/>
	  </colgroup>
	</xsl:if>
	<xsl:apply-templates/>
      </table>
    </td>
  </xsl:template>

  <xsl:template match="cnx:thead|cnx:tfoot|cnx:tbody">
    <xsl:element name="{local-name(.)}">
      <xsl:call-template name="IdCheck"/>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="cnx:row">
    <tr>
      <xsl:if test="@valign">
	<xsl:attribute name="valign">
	  <xsl:value-of select="@valign"/>
	</xsl:attribute>
      </xsl:if>
      <xsl:call-template name="IdCheck"/>
      <xsl:apply-templates/>
    </tr>
  </xsl:template>
  
  <xsl:template match="cnx:thead/cnx:row/cnx:entry|cnx:tfoot/cnx:row/cnx:entry">
    <xsl:call-template name="process.cell">
      <xsl:with-param name="cellgi">th</xsl:with-param>
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="cnx:tbody/cnx:row/cnx:entry">
    <xsl:variable name="row.header.or.not">
      <xsl:call-template name="row.header.or.not">
        <xsl:with-param name="entry" select="."/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:call-template name="process.cell">
      <xsl:with-param name="cellgi">
        <xsl:value-of select="$row.header.or.not"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="row.header.or.not">
    <xsl:param name="entry" select="."/>
    <xsl:variable name="entry.colnum">
      <xsl:call-template name="entry.colnum"/>
    </xsl:variable>
    <xsl:variable name="row.header.class.or.not">
      <xsl:call-template name="row.header.class.or.not">
        <xsl:with-param name="entry.colnum" select="$entry.colnum"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$row.header.class.or.not = '1'">th</xsl:when>
      <xsl:when test="substring(ancestor::*[3]/cnx:spanspec[@spanname=current()/@spanname]/@namest,1,7) = 'header_'">th</xsl:when>
      <xsl:when test="substring(ancestor::*[3]/cnx:colspec[@colnum=$entry.colnum]/@colname,1,7) = 'header_'">th</xsl:when>
      <xsl:when test="substring(ancestor::*[3]/cnx:colspec[position()=$entry.colnum and not(@colnum)]/@colname,1,7) = 'header_'">th</xsl:when>
      <xsl:otherwise>td</xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template name="row.header.class.or.not">
    <xsl:param name="step" select="'entry'"/>
    <xsl:param name="entry.colnum">1</xsl:param>
    <xsl:variable name="provided-class">
      <xsl:choose>
        <xsl:when test="$step='entry'">
          <xsl:value-of select="normalize-space(@class)"/>
        </xsl:when>
        <xsl:when test="$step='colspecstep1'">
          <xsl:value-of select="normalize-space(ancestor::*[3]/cnx:colspec[@colnum=$entry.colnum]/@class)"/>
        </xsl:when>
        <xsl:when test="$step='colspecstep2'">
          <xsl:value-of select="normalize-space(ancestor::*[3]/cnx:colspec[position()=$entry.colnum and not(@colnum)]/@class)"/>
        </xsl:when>
        <xsl:when test="$step='spanspec'">
          <xsl:value-of select="normalize-space(ancestor::*[3]/cnx:spanspec[@spanname=current()/@spanname]/@class)"/>
        </xsl:when>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="row.header.class.or.not">
      <xsl:call-template name="class-test">
        <xsl:with-param name="provided-class" select="$provided-class"/>
        <xsl:with-param name="wanted-class" select="'rowheader'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$row.header.class.or.not='1'">1</xsl:when>
      <xsl:when test="$step='entry'">
        <xsl:call-template name="row.header.class.or.not">
          <xsl:with-param name="entry.colnum" select="$entry.colnum"/>
          <xsl:with-param name="step" select="'colspecstep1'"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$step='colspecstep1'">
        <xsl:call-template name="row.header.class.or.not">
          <xsl:with-param name="entry.colnum" select="$entry.colnum"/>
          <xsl:with-param name="step" select="'colspecstep2'"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$step='colspecstep2'">
        <xsl:call-template name="row.header.class.or.not">
          <xsl:with-param name="entry.colnum" select="$entry.colnum"/>
          <xsl:with-param name="step" select="'spanspec'"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>0</xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="process.cell">
    <xsl:param name="cellgi"/>

    <xsl:element name="{$cellgi}">
      <xsl:apply-templates select="@ep:*"></xsl:apply-templates>
      <xsl:if test="@morerows">
	<xsl:attribute name="rowspan">
	  <xsl:value-of select="@morerows+1"/>
	</xsl:attribute>
      </xsl:if>
      <xsl:if test="(@namest and @nameend) or @spanname">
	<xsl:attribute name="colspan">
	  <xsl:call-template name="calculate.colspan"/>
	</xsl:attribute>
      </xsl:if>
      <xsl:if test="@valign">
	<xsl:attribute name="valign">
	  <xsl:value-of select="@valign"/>
	</xsl:attribute>
      </xsl:if>
      <xsl:call-template name="IdCheck"/>
      <xsl:if test="ancestor-or-self::*/@char or ancestor::*/cnx:colspec/@char or ancestor::*[3]/cnx:spanspec/@char">
	<xsl:call-template name="style.param.determiner">
	  <xsl:with-param name="style.name" select="'char'"/>
	</xsl:call-template>
      </xsl:if>
      <xsl:if test="ancestor-or-self::*/@charoff or ancestor::*/cnx:colspec/@charoff or ancestor::*[3]/cnx:spanspec/@charoff">
	<xsl:call-template name="style.param.determiner">
	  <xsl:with-param name="style.name" select="'charoff'"/>
	</xsl:call-template>
      </xsl:if>

      <xsl:choose>
	<xsl:when test="count(node()) = 0">
	  <xsl:text> </xsl:text>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:apply-templates/>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:element>
  </xsl:template>

  <xsl:template name="style.param.determiner">
    <xsl:param name="style.name"/>
    <xsl:variable name="entry.colnum">
      <xsl:call-template name="entry.colnum"/>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$style.name='rowsep' and          (parent::cnx:row[not(following-sibling::cnx:row)]           and not(ancestor::*[2][preceding-sibling::cnx:tfoot or self::cnx:thead]      or (ancestor::cnx:tgroup[following-sibling::cnx:tgroup] and not(ancestor::cnx:entrytbl))) or          @morerows=count(parent::cnx:row/following-sibling::cnx:row)           and not(ancestor::*[2][preceding-sibling::cnx:tfoot or self::cnx:thead]      or (ancestor::cnx:tgroup[following-sibling::cnx:tgroup] and not(ancestor::cnx:entrytbl))))">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="'0'"/>
	  <xsl:with-param name="style.name" select="'rowsep'"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$style.name='colsep' and          not(following-sibling::*) and          not(parent::cnx:row/preceding-sibling::cnx:row/cnx:entry[position()=last()][(@morerows + count(parent::cnx:row/preceding-sibling::cnx:row)) &gt;= count(current()/parent::cnx:row/preceding-sibling::cnx:row)])">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="'0'"/>
	  <xsl:with-param name="style.name" select="'colsep'"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="attribute::*[name()=$style.name]">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$style.name='rowsep' and parent::cnx:row/@rowsep">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="parent::cnx:row/@rowsep"/>
	  <xsl:with-param name="style.name" select="'rowsep'"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[2]/cnx:colspec[@colnum=$entry.colnum]/attribute::*[name()=$style.name]">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[2]/cnx:colspec[@colnum=$entry.colnum]/attribute::*[name()=$style.name]"/> 
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[2]/cnx:colspec[position()=$entry.colnum and not(@colnum)]/attribute::*[name()=$style.name]">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[2]/cnx:colspec[position()=$entry.colnum and not(@colnum)]/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[3]/cnx:spanspec[@spanname=current()/@spanname]/attribute::*[name()=$style.name] and not(ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[3]/cnx:spanspec[@spanname=current()/@spanname]/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[3]/cnx:colspec[@colnum=$entry.colnum]/attribute::*[name()=$style.name] and not(ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[3]/cnx:colspec[@colnum=$entry.colnum]/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[3]/cnx:colspec[position()=$entry.colnum and not(@colnum)]/attribute::*[name()=$style.name] and not(ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[3]/cnx:colspec[position()=$entry.colnum]/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::*[3]/attribute::*[name()=$style.name]">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::*[3]/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="ancestor::cnx:table/attribute::*[name()=$style.name] and not(ancestor::cnx:entrytbl)">
	<xsl:call-template name="style.maker">
	  <xsl:with-param name="style.param" select="ancestor::cnx:table/attribute::*[name()=$style.name]"/>
	  <xsl:with-param name="style.name" select="$style.name"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
	<xsl:choose>
	  <xsl:when test="$style.name='rowsep' or $style.name='colsep'">
	    <xsl:call-template name="style.maker">
	      <xsl:with-param name="style.param" select="'1'"/>
	      <xsl:with-param name="style.name" select="$style.name"/>
	    </xsl:call-template>
	  </xsl:when>
	  <xsl:when test="$style.name='align'">
	    <xsl:choose>
	      <xsl:when test="@spanname and not(ancestor::*[2]/cnx:colspec)">
		<xsl:call-template name="style.maker">
		  <xsl:with-param name="style.param" select="'center'"/>
		  <xsl:with-param name="style.name" select="'align'"/>
		</xsl:call-template>
	      </xsl:when>
	      <xsl:otherwise>
		<xsl:call-template name="style.maker">
		  <xsl:with-param name="style.param" select="'left'"/>
		  <xsl:with-param name="style.name" select="'align'"/>
		</xsl:call-template>
	      </xsl:otherwise>
	    </xsl:choose>
	  </xsl:when>
	  <xsl:when test="$style.name='char' or $style.name='charoff'">
	    <xsl:call-template name="style.maker">
	      <xsl:with-param name="style.param" select="'null'"/>
	      <xsl:with-param name="style.name" select="$style.name"/>
	    </xsl:call-template>
	  </xsl:when>
	</xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="style.maker">
    <xsl:param name="style.name"/>
    <xsl:param name="style.param"/>
    <xsl:choose>
      <xsl:when test="$style.name='colsep'">
	<xsl:choose>
	  <xsl:when test="$style.param='0'">
	    <xsl:text>border-right: 0 !important; </xsl:text>
	  </xsl:when>
	  <xsl:otherwise>
	    <xsl:text>border-right: 1px solid; </xsl:text>
	  </xsl:otherwise>
	</xsl:choose>
      </xsl:when>
      <xsl:when test="$style.name='rowsep'">
	<xsl:choose>
	  <xsl:when test="$style.param='0'">
	    <xsl:text>border-bottom: 0 !important; </xsl:text>
	  </xsl:when>
	  <xsl:otherwise>
	    <xsl:text>border-bottom: 1px solid; </xsl:text>
	  </xsl:otherwise>
	</xsl:choose>
      </xsl:when>
      <xsl:when test="$style.name='align'">
	<xsl:text>text-align: </xsl:text>
	<xsl:value-of select="$style.param"/>
	<xsl:text> !important; </xsl:text>
      </xsl:when>
      <xsl:when test="$style.name='char' or $style.name='charoff'">
	<xsl:choose>
	  <xsl:when test="$style.param='null'"/>
	  <xsl:otherwise>
	    <xsl:attribute name="{$style.name}">
	      <xsl:value-of select="$style.param"/>
	    </xsl:attribute>
	  </xsl:otherwise>
	</xsl:choose>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="entry.colnum">
    <xsl:param name="entry" select="."/>
    <xsl:choose>
      <xsl:when test="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$entry/@spanname] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:variable name="namest" select="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$entry/@spanname]/@namest"/>
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$namest]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@namest]">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@namest]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@colname]">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@colname]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@namest] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@namest]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@colname] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@colname]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="count($entry/../*) = $entry/ancestor::*[3]/@cols">
	<xsl:value-of select="count($entry/preceding-sibling::*) + 1"/>
      </xsl:when>
      <xsl:when test="$entry/parent::cnx:row/preceding-sibling::cnx:row/cnx:entry[(@morerows + count(parent::cnx:row/preceding-sibling::cnx:row)) &gt;= count($entry/parent::cnx:row/preceding-sibling::cnx:row)]">
        <xsl:call-template name="morerows.check">
          <xsl:with-param name="mc.entry" select="$entry"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="count($entry/preceding-sibling::*) = 0">1</xsl:when>
      <xsl:otherwise>
        <xsl:variable name="pcol">
          <xsl:call-template name="entry.ending.colnum">
            <xsl:with-param name="entry" select="$entry/preceding-sibling::*[1]"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:value-of select="$pcol + 1"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="entry.ending.colnum">
    <xsl:param name="entry" select="."/>
    <xsl:choose>
      <xsl:when test="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$entry/@spanname] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:variable name="nameend" select="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$entry/@spanname]/@nameend"/>
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$nameend]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@nameend]">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@nameend]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@colname]">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$entry/@colname]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@nameend] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@nameend]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@colname] and not($entry/ancestor::*[2]/cnx:colspec)">
	<xsl:call-template name="colspec.colnum">
	  <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$entry/@colname]"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:when test="count($entry/preceding-sibling::*) = 0">1</xsl:when>
      <xsl:otherwise>
	<xsl:variable name="pcol">
	  <xsl:call-template name="entry.ending.colnum">
	    <xsl:with-param name="entry" select="$entry/preceding-sibling::*[1]"/>
	  </xsl:call-template>
	</xsl:variable>
	<xsl:value-of select="$pcol + 1"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="morerows.check">
    <xsl:param name="mc.entry"/> 
    <xsl:param name="mc.first.part" select="';'"/>
    <xsl:param name="mc.row.number.being.checked" select="1"/>
    <xsl:param name="mc.entry.number.being.checked" select="1"/>
    <xsl:param name="mc.cols.quantity" select="$mc.entry/ancestor::*[3]/@cols"/>
    <xsl:param name="mc.cols">
      <xsl:call-template name="mc.cols.initialization">
	<xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	<xsl:with-param name="mc.cols" select="';'"/>
      </xsl:call-template>
    </xsl:param>
    <xsl:choose>
      <xsl:when test="generate-id($mc.entry/ancestor::*[2]/cnx:row[position()=number($mc.row.number.being.checked)]/child::*[position()=number($mc.entry.number.being.checked)]) = generate-id($mc.entry)">
	<xsl:call-template name="mc.determine.colnum">
	  <xsl:with-param name="mc.cols" select="$mc.cols"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
	<xsl:call-template name="mc.cols.assignment">
	  <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
	  <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
	  <xsl:with-param name="mc.entry" select="$mc.entry"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	  <xsl:with-param name="mc.cols" select="$mc.cols"/>
	  <xsl:with-param name="mc.first.part" select="$mc.first.part"/>
	</xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="mc.cols.initialization">
    <xsl:param name="mci.iteration" select="1"/>
    <xsl:param name="mc.cols"/>
    <xsl:param name="mc.cols.quantity"/>
    <xsl:choose>
      <xsl:when test="$mci.iteration &gt; $mc.cols.quantity">
        <xsl:value-of select="$mc.cols"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="mc.cols.initialization">
          <xsl:with-param name="mci.iteration" select="$mci.iteration + 1"/>
          <xsl:with-param name="mc.cols" select="concat($mc.cols,'0;')"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
       </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="mc.cols.assignment">
    <xsl:param name="mc.cols"/>
    <xsl:param name="mc.first.part"/>
    <xsl:param name="mca.number.in.question">
      <xsl:choose>
 	<xsl:when test="$mc.cols != $mc.first.part">
          <xsl:value-of select="substring-before(substring-after($mc.cols,$mc.first.part),';')"/>
	</xsl:when>
	<xsl:otherwise>0</xsl:otherwise>
      </xsl:choose>
    </xsl:param>
    <xsl:param name="mca.last.part">
      <xsl:choose>
	<xsl:when test="$mc.cols != $mc.first.part">
	  <xsl:value-of select="substring-after($mc.cols,concat($mc.first.part,$mca.number.in.question))"/>
	</xsl:when>
	<xsl:otherwise>;</xsl:otherwise>
      </xsl:choose>
    </xsl:param>
    <xsl:param name="mc.cols.quantity"/>
    <xsl:param name="mc.entry"/>
    <xsl:param name="mc.entry.number.being.checked"/>
    <xsl:param name="mc.row.number.being.checked"/>
    <xsl:param name="mca.entry.being.checked" select="$mc.entry/ancestor::*[2]/cnx:row[position()=number($mc.row.number.being.checked)]/child::*[position()=number($mc.entry.number.being.checked)]"/>
    <xsl:param name="mca.rowspan">
      <xsl:choose>
	<xsl:when test="$mca.entry.being.checked/@morerows">
	  <xsl:value-of select="$mca.entry.being.checked/@morerows + 1"/>
	</xsl:when>
	<xsl:otherwise>1</xsl:otherwise>
      </xsl:choose>
    </xsl:param>
    <xsl:param name="mca.colspan">
      <xsl:choose>
	<xsl:when test="($mca.entry.being.checked/@namest and $mca.entry.being.checked/@nameend) or $mca.entry.being.checked/@spanname">
	  <xsl:call-template name="calculate.colspan">
	    <xsl:with-param name="entry" select="$mca.entry.being.checked"/>
	  </xsl:call-template>
	</xsl:when>
	<xsl:otherwise>1</xsl:otherwise>
      </xsl:choose>
    </xsl:param>
    <xsl:param name="mc.cols.quantity.test">
      <xsl:choose>
	<xsl:when test="$mc.first.part = $mc.cols">
	  <xsl:value-of select="$mc.cols.quantity + 1"/>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:value-of select="$mc.cols.quantity"/>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:param>
    <xsl:choose>
      <xsl:when test="string($mca.number.in.question)!='NaN' and $mca.number.in.question != '' and $mca.number.in.question != 0">
	<xsl:call-template name="mc.cols.assignment">
	  <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
	  <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
	  <xsl:with-param name="mc.entry" select="$mc.entry"/>
	  <xsl:with-param name="mc.cols" select="$mc.cols"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	  <xsl:with-param name="mc.first.part" select="concat($mc.first.part,$mca.number.in.question,';')"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
	<xsl:choose>
	  <xsl:when test="$mca.colspan &gt; 1">
	    <xsl:call-template name="mc.cols.assignment">
	      <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
	      <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
	      <xsl:with-param name="mc.entry" select="$mc.entry"/>
	      <xsl:with-param name="mca.colspan" select="$mca.colspan - 1"/>
	      <xsl:with-param name="mca.rowspan" select="$mca.rowspan"/>
	      <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity.test"/>
	      <xsl:with-param name="mc.cols" select="concat($mc.first.part,$mca.rowspan,$mca.last.part)"/>
	      <xsl:with-param name="mc.first.part" select="concat($mc.first.part,$mca.rowspan,';')"/>
	    </xsl:call-template>
	  </xsl:when>
	  <xsl:otherwise>
	    <xsl:choose>
	      <xsl:when test="boolean($mc.entry/ancestor::*[2]/cnx:row[position()=number($mc.row.number.being.checked)]/child::*[position()=number($mc.entry.number.being.checked)][following-sibling::*])">
		<xsl:call-template name="morerows.check">
		  <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
		  <xsl:with-param name="mc.entry.number.being.checked" select="number($mc.entry.number.being.checked) + 1"/>
		  <xsl:with-param name="mc.entry" select="$mc.entry"/>
		  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity.test"/>
		  <xsl:with-param name="mc.cols" select="concat($mc.first.part,$mca.rowspan,$mca.last.part)"/>
		  <xsl:with-param name="mc.first.part" select="concat($mc.first.part,$mca.rowspan,';')"/>
		</xsl:call-template>
	      </xsl:when>
	      <xsl:otherwise>
		<xsl:call-template name="mc.cols.reset">
		  <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
		  <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
		  <xsl:with-param name="mc.entry" select="$mc.entry"/>
		  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity.test"/>
		  <xsl:with-param name="mc.cols" select="concat($mc.first.part,$mca.rowspan,$mca.last.part)"/>
		</xsl:call-template>
	      </xsl:otherwise>
	    </xsl:choose>
	  </xsl:otherwise>
	</xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="mc.cols.reset">
    <xsl:param name="mc.cols"/>
    <xsl:param name="mcr.iteration" select="1"/>
    <xsl:param name="mcr.first.part" select="';'"/>
    <xsl:param name="mcr.number.in.question" select="number(substring-before(substring-after($mc.cols,$mcr.first.part),';'))"/>
    <xsl:param name="mcr.last.part" select="number(substring-after($mc.cols,concat($mcr.first.part,$mcr.number.in.question)))"/>
    <xsl:param name="mc.row.number.being.checked"/>
    <xsl:param name="mc.entry.number.being.checked"/>
    <xsl:param name="mc.entry"/>
    <xsl:param name="mc.cols.quantity"/>
    <xsl:choose>
      <xsl:when test="$mcr.iteration &gt; $mc.cols.quantity">
	<xsl:call-template name="morerows.check">
	  <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked + 1"/>
	  <xsl:with-param name="mc.entry.number.being.checked" select="'1'"/>
	  <xsl:with-param name="mc.entry" select="$mc.entry"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	  <xsl:with-param name="mc.cols" select="$mc.cols"/>
	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
	<xsl:choose>
	  <xsl:when test="$mcr.number.in.question &lt; 1">
	    <xsl:call-template name="mc.cols.reset">
	      <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
	      <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
	      <xsl:with-param name="mc.entry" select="$mc.entry"/>
	      <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	      <xsl:with-param name="mc.cols" select="concat($mcr.first.part,0,$mcr.last.part)"/>
	      <xsl:with-param name="mcr.first.part" select="concat($mcr.first.part,'0;')"/>
	      <xsl:with-param name="mcr.iteration" select="$mcr.iteration + 1"/>
	    </xsl:call-template>
	  </xsl:when>
	  <xsl:otherwise>
	    <xsl:call-template name="mc.cols.reset">
	      <xsl:with-param name="mc.row.number.being.checked" select="$mc.row.number.being.checked"/>
	      <xsl:with-param name="mc.entry.number.being.checked" select="$mc.entry.number.being.checked"/>
	      <xsl:with-param name="mc.entry" select="$mc.entry"/>
	      <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	      <xsl:with-param name="mc.cols" select="concat($mcr.first.part,$mcr.number.in.question - 1,$mcr.last.part)"/>
	      <xsl:with-param name="mcr.first.part" select="concat($mcr.first.part,$mcr.number.in.question - 1,';')"/>
	      <xsl:with-param name="mcr.iteration" select="$mcr.iteration + 1"/>
	    </xsl:call-template>
	  </xsl:otherwise>
	</xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="mc.determine.colnum">
    <xsl:param name="mc.cols"/>
    <xsl:param name="mc.first.part" select="';'"/>
    <xsl:param name="mdc.iteration" select="1"/>
    <xsl:param name="mdc.number.in.question" select="number(substring-before(substring-after($mc.cols,$mc.first.part),';'))"/>
    <xsl:param name="mc.cols.quantity"/>
    <xsl:choose>
      <xsl:when test="($mdc.number.in.question = 0) or ($mdc.iteration &gt; $mc.cols.quantity)">
	<xsl:value-of select="$mdc.iteration"/>
      </xsl:when>
      <xsl:otherwise>
	<xsl:call-template name="mc.determine.colnum">
	  <xsl:with-param name="mc.first.part" select="concat($mc.first.part,$mdc.number.in.question,';')"/>
	  <xsl:with-param name="mc.cols" select="$mc.cols"/>
	  <xsl:with-param name="mc.cols.quantity" select="$mc.cols.quantity"/>
	  <xsl:with-param name="mdc.iteration" select="$mdc.iteration + 1"/>
	</xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="colspec.colnum">
    <xsl:param name="colspec" select="."/>
    <xsl:choose>
      <xsl:when test="$colspec/@colnum">
	<xsl:value-of select="$colspec/@colnum"/>
      </xsl:when>
      <xsl:when test="$colspec/preceding-sibling::cnx:colspec">
	<xsl:variable name="prec.colspec.colnum">
	  <xsl:call-template name="colspec.colnum">
	    <xsl:with-param name="colspec" select="$colspec/preceding-sibling::cnx:colspec[1]"/>
	  </xsl:call-template>
	</xsl:variable>
	<xsl:value-of select="$prec.colspec.colnum + 1"/>
      </xsl:when>
      <xsl:otherwise>1</xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="col.maker">
    <xsl:param name="cm.iteration" select="'1'"/>
      <xsl:param name="colwidth">
      <xsl:choose>
	<xsl:when test="child::*/cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))]/@colwidth">
	  <xsl:value-of select="child::*/cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))]/@colwidth"/>
	</xsl:when>
	<xsl:when test="cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))]/@colwidth">
	  <xsl:value-of select="cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))]/@colwidth"/>
	</xsl:when>
      </xsl:choose>
    </xsl:param>
    <xsl:choose>
      <xsl:when test="$cm.iteration &gt; @cols"/>
      <xsl:otherwise>
	<col>
	  <xsl:choose>
	    <xsl:when test="cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))][@colwidth!=''] or         child::*/cnx:colspec[(@colnum=$cm.iteration) or (position()=$cm.iteration and not(@colnum))][@colwidth!='']">
	      <xsl:choose>
		<xsl:when test="contains($colwidth,'in') or      contains($colwidth,'em') or      contains($colwidth,'cm') or      contains($colwidth,'pc') or      contains($colwidth,'pi') or      contains($colwidth,'mm') or      contains($colwidth,'ex')">
		</xsl:when>
		<xsl:otherwise>
		  <xsl:attribute name="width">
		    <xsl:value-of select="concat($colwidth, '%')"/>
		  </xsl:attribute>
		</xsl:otherwise>
	      </xsl:choose>
	    </xsl:when>
	    <xsl:otherwise>
	      <xsl:attribute name="width">
		<xsl:text>1*</xsl:text>
	      </xsl:attribute>
	    </xsl:otherwise>
	  </xsl:choose>
	</col>

	<xsl:call-template name="col.maker">
	  <xsl:with-param name="cm.iteration" select="$cm.iteration + 1"/>
	</xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="calculate.colspan">
    <xsl:param name="entry" select="."/>
    <xsl:variable name="spanname" select="$entry/@spanname"/>
    <xsl:variable name="namest">
      <xsl:choose>
	<xsl:when test="$entry/@spanname and not($entry/ancestor::*[2]/cnx:colspec)">
	  <xsl:value-of select="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$spanname]/@namest"/>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:value-of select="$entry/@namest"/>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="nameend">
      <xsl:choose>
	<xsl:when test="$entry/@spanname and not($entry/ancestor::*[2]/cnx:colspec)">
	  <xsl:value-of select="$entry/ancestor::*[3]/cnx:spanspec[@spanname=$spanname]/@nameend"/>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:value-of select="$entry/@nameend"/>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="scol">
      <xsl:choose>
	<xsl:when test="$entry/ancestor::*[2]/cnx:colspec">
	  <xsl:call-template name="colspec.colnum">
	    <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$namest]"/>
	  </xsl:call-template>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:call-template name="colspec.colnum">
	    <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$namest]"/>
	  </xsl:call-template>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="ecol">
      <xsl:choose>
	<xsl:when test="$entry/ancestor::*[2]/cnx:colspec">
	  <xsl:call-template name="colspec.colnum">
	    <xsl:with-param name="colspec" select="$entry/ancestor::*[2]/cnx:colspec[@colname=$nameend]"/>
	  </xsl:call-template>
	</xsl:when>
	<xsl:otherwise>
	  <xsl:call-template name="colspec.colnum">
	    <xsl:with-param name="colspec" select="$entry/ancestor::*[3]/cnx:colspec[@colname=$nameend]"/>
	  </xsl:call-template>
	</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:value-of select="$ecol - $scol + 1"/>
  </xsl:template>

  <xsl:template match="@ep:style[parent::cnx:table]">
  </xsl:template>

</xsl:stylesheet>
