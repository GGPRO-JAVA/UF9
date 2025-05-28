# 2. Llançar excepcions (throw)

## 2.1. Per què llançar excepcions?

Un programador pot programar el seu codi de manera que es llancen excepcions quan s'intente fer una cosa incorrecta o inesperada (a vegades és recomanable). Per exemple, quan els arguments que se li passen a un mètode no són correctes o no compleixen uns certs criteris. Això és habitual en la Programació Orientada a Objectes (POO): Recordeu que una classe ha de ser la responsable de la lògica dels seus objectes: assegurar que les dades siguen vàlides, a més de controlar què està permés i què no està permés fer. **Per exemple, si s'instancia una classe amb valors incorrectes** com un objecte Persona amb un DNI no vàlid, una edat negativa, un compte bancari amb saldo negatiu, etc. En aqueixos casos **és convenient que el constructor llance una excepció**.

També **pot ser apropiat llançar excepcions en els setters** si el valor no és vàlid, **i en qualsevol altre mètode en el qual s'intente fer una cosa no permesa o que viole la integritat de l'objecte**, com per exemple retirar diners d'un compte sense saldo suficient.

>[!WARNING] <strong>ATENCIÓ!:</strong>
>S’ha de tindre en compte que <strong>les excepcions poden manejar-se i controlar-se sense que el programa es pare</strong> (en l'apartat 3 s'explica com).
>
>És a dir, llançar una excepció no implica necessàriament que el programa acabarà, és simplement una manera d'avisar d'un error. <strong>Qui cride al mètode és responsable de manejar l'excepció perquè el programa no es pare</strong>.

## 2.2. Com llançar una excepció

Per a llançar l'excepció s'utilitza la paraula reservada `throw` seguit d'un objecte de tipus **<i>Exception</i>** (o alguna de les seues subclasses com <i>ArithmeticException, NumberFormatException, ArrayIndexOutOfBoundsException</i>, etc.). Com les excepcions són objectes, deuen instanciar-se amb `new`. Per tant, **podem llançar una excepció genèrica així**:

```java
throw new Exception();
```

Això és equivalent a primer instanciar l'objecte <i>Exception</i> i després llançar-lo:

```java
Exception e = new Exception();
throw e;
```

El constructor de <i>Exception</i> permet (opcionalment) un argument `String` per a donar detalls sobre el problema. Si l'excepció no es maneja i el programa es para, el missatge d'error es mostrarà per la consola (això és molt útil per a depurar programes).

```java
throw new Exception("L'edat no pot ser negativa");
```

En lloc de llançar excepcions genèriques (<i>Exception</i>), també és possible llançar excepcions específiques de Java com per exemple <i>ArrayIndexOutOfBoundsException, ArithmeticException, NumberFormatException</i>, etc. A Java totes les classes d'excepcions hereten de <i>Exception</i>.

```java
throw new NumberFormatException("...");
```

>[!WARNING] <strong>ATENCIÓ!:</strong>
>En lloc de llançar excepcions pròpies de Java (<i>ArithmeticException, NumberFormatException, ArrayIndexOutOfBoundsException</i>, etc.) **normalment és preferible llançar excepcions genèriques ‘Exception’ o millor encara, utilitzar les nostres pròpies excepcions** (apartat 5).

## 2.3. Indicar l'excepció en la capçalera del mètode

**És obligatori indicar en la capçalera del mètode que pot llançar excepcions**. Per a això s’ha d’afegir, a la dreta de la capçalera i abans de les claus, la paraula reservada `throws` seguit de la **mena d'excepció** que pot llançar (si pot llançar diferents tipus d'excepcions deuen indicar-se totes separades per comes).

Per exemple, vegem el mètode <i>setEdat(int edat)</i> de la classe <i>Persona</i>. Com hem decidit que l'edat d'una persona no pot ser negativa, llançarem una excepció si edat < 0.

```java
// Setter de l'atribut edat. Ha de ser >= 0
public void setEdat(int edat) throws Exception {
    if (edat < 0)
        throw new Exception("Edat negativa no permesa");
    else
        this.edat = edat;
}
```

Cal tindre en compte que **en llançar una excepció es pararà l'execució d'aquest mètode (no s'executarà la resta del codi del mètode) i es llançarà l'excepció al mètode que el va cridar**. Si per exemple des de la funció <i>main</i> cridem a <i>setEdat()</i>, com pot succeir que <i>setEdat()</i> llance una excepció, llavors en la pràctica és possible que el <i>main</i> llance una excepció (no directament amb un <i>throw</i>, sinó per l'excepció que ens llança <i>setEdat()</i>). Per tant, també hem d'especificar en el <i>main</i> que es pot llançar una excepció:

```java
public static void main(String[] args) throws Exception {
    Persona p = new Persona("44193900L", "Pepito", 27);
    ...
    ...
    p.setEdat(valor); // Pot llançar una excepció
}
```

## 2.4. Llançant diferents tipus d'excepcions

**Un mètode pot llançar diferents tipus d'excepcions** (si ho considerem necessari). En tal cas, **cal especificar tots els tipus possibles en la capçalera, separats per comes**. Per exemple, imaginem que el constructor de <i>Persona</i> pren com a arguments el dni i l'edat, i volem llançar excepcions diferents segons cada cas.

```java
public Persona(String dni, int edat) throws InvalidDniException, InvalidEdatException {
    if (!dni.matches("^[0-9]{8}[A-Z]")) {
        throw new InvalidDniException("DNI no vàlid: " + dni);
    }
    if (edat < 0) {
        throw new InvalidEdatException("Edat no vàlida: " + edat);
    }
    this.dni = dni;
    this.edat = edat;
}
```

>[!WARNING] <strong>ATENCIÓ!:</strong>
>Compte: tingueu en compte que <i>InvalidEdatException</i> i <i>InvalidDniException</i> no són tipus d'excepcions de Java, sinó excepcions pròpies que nosaltres hauríem definit a mida per al nostre programari (veure apartat 5).

## 2.5. Les excepcions es llancen de mètode a mètode (“hot potato”)

Observeu que el llançament d'excepcions es produeix recursivament a través de la seqüència de cridades a mètodes. Imaginem que en el mètode A cridem al mètode B, que crida al mètode C, etc. fins a arribar a E.

A → B → C → D → E (seqüència de crides de mètodes)

Si el mètode E llança una excepció, aquesta li arribarà a D que al seu temps li la llançarà a C, etc. recorrent el camí invers fins a arribar al mètode inicial A.

A ← B ← C ← D ← E (seqüència de llançament d'excepcions)

Per tant, com tots aquests mètodes poden acabar llançant una excepció, en les seues capçaleres caldrà incloure el `throws Exception` (o el que corresponga segons el tipus d'excepció).

>[!WARNING] <strong>ATENCIÓ!:</strong>
>**Compte: no és recomanable deixar que les excepcions del nostre programari arriben de manera descontrolada fins al main i acaben el programa. El més ideal és manejar les excepcions** com veurem en el següent apartat.
